# Video-Based Room Measurement, Fixture Detection and 3D Room Rendering System

## 1. Purpose

This document describes a system that can take an existing **photo or video of a room inside a house** and produce a measured 2D/3D room model.

The system should support:

* Room measurements from video.
* Non-cube rooms.
* Angled spaces, such as under-stair areas.
* Doors, windows, and openings.
* Distance from doors/windows to wall edges, ceiling, floor, and nearby corners.
* Fixed items such as wall lights, plug sockets, vents, switches, radiators, and fixed panels.
* Furniture detection/removal or ignoring furniture during measurement.
* A 3D rendered result with different colours for different detected features.
* Confidence levels for measurements.

Existing examples that are relevant include Apple RoomPlan, which uses camera and LiDAR to create room floor plans with dimensions and recognised room components, and Google ARCore Depth, which creates depth maps to understand real-world scene shape and distance. ([Apple Developer][1])

---

# 2. Non-Technical Summary

The idea is to upload a video of a room and let the system rebuild a simple 3D version of that room.

Instead of assuming every room is a perfect square or cube, the system would detect the real shape of the room:

```text
walls
floor
ceiling
alcoves
angled walls
under-stair spaces
doors
windows
vents
lights
plug sockets
switches
```

The system would then measure these features and show them in a 3D model.

For example, it could say:

```text
Window 1:
- Width: 1.2m
- Height: 1.0m
- Distance from left wall corner: 0.6m
- Distance from floor: 0.9m
- Distance from ceiling: 0.5m

Door 1:
- Width: 0.76m
- Height: 1.98m
- Distance from left wall corner: 0.3m
```

Furniture can be detected and ignored, because furniture is usually not part of the room structure. If a sofa is blocking part of a wall, the system may estimate the hidden wall, but it should clearly mark that measurement as lower confidence.

The result should not just be a pretty 3D render. It should be a **measured room model** with:

```text
seen geometry
estimated geometry
manual corrections
confidence scores
```

---

# 3. Technical Summary

The technical system would use video reconstruction, computer vision, object detection, segmentation, and 3D geometry.

A good pipeline would be:

```text
Existing room video
→ extract video frames
→ remove blurry frames
→ estimate camera movement
→ reconstruct a 3D point cloud
→ detect floor/walls/ceiling
→ detect doors/windows/openings
→ detect fixed wall features
→ detect and ignore furniture
→ fit planes and polygons
→ apply real-world scale
→ calculate measurements
→ generate 2D/3D outputs
→ assign confidence scores
```

For existing videos, a Structure-from-Motion and Multi-View Stereo tool such as COLMAP is relevant because it reconstructs camera positions and 3D structure from image collections. COLMAP describes itself as a general-purpose SfM/MVS pipeline with graphical and command-line interfaces. ([colmap.github.io][2])

For plane extraction, Open3D is relevant because it supports point cloud plane segmentation using RANSAC, returning plane models such as wall, floor, or ceiling planes. ([open3d.org][3])

---

# 4. Important Principle: Do Not Treat the Room as a Cube

A simple room measurement system might think like this:

```text
Room = width × length × height
```

That is not enough.

A better system should think like this:

```text
Room =
  floor polygon
  ceiling polygon
  wall planes
  angled planes
  openings
  doors
  windows
  fixed fixtures
  hidden/inferred areas
  confidence values
```

This allows the system to handle:

```text
under-stair triangular spaces
sloped ceilings
bay windows
chimney breasts
alcoves
L-shaped rooms
non-square corners
angled walls
split-level areas
partial-height walls
```

---

# 5. Main Features to Detect

## 5.1 Structural Surfaces

The system should detect:

```text
floor
ceiling
main walls
angled walls
partial walls
under-stair planes
stair side panels
alcove returns
chimney breast faces
bay window faces
```

Each surface should have:

```text
surface type
3D coordinates
area
length
height
angle
confidence score
visible or inferred status
```

Example:

```json
{
  "id": "wall_001",
  "type": "wall",
  "geometry": "plane",
  "length": 4.2,
  "height": 2.4,
  "area": 10.08,
  "confidence": 0.91,
  "visibility": "mostly_visible"
}
```

---

## 5.2 Doors

Doors should be detected as openings or door objects attached to a wall.

Measurements should include:

```text
door width
door height
distance from left wall edge
distance from right wall edge
distance from floor
distance from ceiling
door centre point
opening direction if visible
door frame thickness if visible
```

Example:

```json
{
  "id": "door_001",
  "type": "door",
  "attachedTo": "wall_002",
  "width": 0.762,
  "height": 1.981,
  "distanceFromLeftWallEdge": 0.42,
  "distanceFromRightWallEdge": 2.86,
  "distanceFromFloor": 0,
  "distanceFromCeiling": 0.41,
  "confidence": 0.88
}
```

In building information modelling, IFC has specific concepts for doors inserted into openings, and doors can be represented as standard door cases or more general geometry. This is useful as a reference model for exporting structured building data. ([standards.buildingsmart.org][4])

---

## 5.3 Windows

Windows should be treated similarly to doors, but with extra measurements for height from floor and height to ceiling.

Measurements should include:

```text
window width
window height
distance from left wall edge
distance from right wall edge
distance from floor to sill
distance from top of window to ceiling
distance from nearby corner
depth/recess if visible
opening type if visible
```

Example:

```json
{
  "id": "window_001",
  "type": "window",
  "attachedTo": "wall_003",
  "width": 1.25,
  "height": 1.05,
  "distanceFromLeftWallEdge": 0.68,
  "distanceFromRightWallEdge": 1.94,
  "distanceFromFloor": 0.92,
  "distanceFromCeiling": 0.43,
  "confidence": 0.84
}
```

IFC also defines windows as building elements inserted into openings, with parameters such as width, height, panel/lining information, and local placement. ([standards.buildingsmart.org][5])

---

## 5.4 Fixed Wall Items

The system should detect fixed items separately from movable furniture.

Examples:

```text
plug sockets
light switches
wall lights
ceiling lights
extractor vents
air bricks
radiators
thermostats
alarm sensors
fuse boxes
boiler panels
network points
TV aerial points
pipe boxing
fixed shelves
```

These do not always need exact construction-level geometry. They can be rendered as coloured markers or simple 3D blocks.

Example:

```json
{
  "id": "socket_001",
  "type": "plug_socket",
  "attachedTo": "wall_001",
  "position": {
    "x": 1.42,
    "y": 0,
    "z": 0.36
  },
  "width": 0.086,
  "height": 0.086,
  "distanceFromFloor": 0.36,
  "distanceFromNearestCorner": 1.42,
  "confidence": 0.72
}
```

---

# 6. Furniture Handling

Furniture should be detected, but usually excluded from structural measurement.

The system should classify objects as:

```text
structural
fixed fixture
movable furniture
temporary object
unknown
```

Example:

```text
Structural:
- walls
- floors
- ceilings
- stairs
- doors
- windows

Fixed:
- sockets
- switches
- lights
- vents
- radiators

Movable:
- sofa
- bed
- table
- chair
- wardrobe
- boxes
```

AI segmentation models can help isolate objects in videos. Meta’s SAM 2 is relevant because it supports segmentation in both images and videos and can track selected objects across frames. ([AI Meta][6])

The system should not fully trust AI-generated furniture removal for measurements. Instead:

```text
detect furniture
→ mask furniture
→ ignore furniture during wall reconstruction
→ infer hidden wall areas
→ mark hidden areas as lower confidence
```

---

# 7. Measurement Confidence

Every measurement should have a confidence level.

## Confidence Levels

| Confidence      | Meaning                                               |
| --------------- | ----------------------------------------------------- |
| High            | Surface or object clearly visible from several angles |
| Medium          | Partly visible, reconstructed from video              |
| Low             | Hidden by furniture or detected from limited frames   |
| Manual required | Not enough evidence from the video                    |

Example output:

```text
Wall A length: 4.21m — high confidence
Window 1 width: 1.18m — medium confidence
Socket 1 position: estimated — low confidence
Wall behind wardrobe: manual check required
```

This is important because the system may see one wall clearly but only infer another wall behind furniture.

---

# 8. Scale Calibration

A normal video can often reconstruct the shape of a room, but it may not know the true real-world scale unless there is a known measurement.

The system should support one or more scale methods:

```text
known door height
known window height
known tile size
A4 paper marker
manual wall measurement
laser measurement of one line
known socket/switch size
known skirting board height
```

Best workflow:

```text
1. Upload video
2. System creates rough 3D model
3. User enters one known measurement
4. System scales the full model
5. User confirms key points
6. System exports final measurements
```

Without scale calibration, the system may know the shape but not the true size.

---

# 9. Under-Stair and Angled Space Handling

Under-stair spaces should be represented as angled and triangular geometry, not as a rectangular box.

The system should detect:

```text
stair slope
triangular side profile
lowest height
highest height
floor footprint
usable storage volume
restricted head-height area
angled wall area
```

Example:

```json
{
  "id": "under_stair_001",
  "type": "under_stair_space",
  "geometry": "triangular_prism",
  "floorArea": 1.85,
  "usableVolume": 2.4,
  "lowestHeight": 0.12,
  "highestHeight": 2.05,
  "surfaces": [
    {
      "type": "sloped_plane",
      "area": 2.9,
      "angleDegrees": 38,
      "confidence": 0.74
    },
    {
      "type": "triangular_side_face",
      "area": 1.6,
      "confidence": 0.69
    }
  ]
}
```

This allows the system to calculate useful values such as:

```text
paintable area
storage volume
restricted-height area
skirting length
floor covering area
wall cladding area
```

---

# 10. 3D Rendering Colour System

The 3D result should use different colours or layers for different feature types.

Example colour/layer concept:

| Feature             | Render style                 |
| ------------------- | ---------------------------- |
| Walls               | Neutral solid surface        |
| Floor               | Separate floor material      |
| Ceiling             | Light transparent plane      |
| Doors               | Brown or labelled opening    |
| Windows             | Blue transparent panel       |
| Plug sockets        | Small yellow marker          |
| Light switches      | Small orange marker          |
| Wall lights         | Small glowing marker         |
| Vents               | Purple or grey grille marker |
| Radiators           | Red/white block              |
| Furniture           | Transparent grey or hidden   |
| Inferred geometry   | Dashed or semi-transparent   |
| Low-confidence area | Red/orange outline           |

The user should be able to toggle layers:

```text
show/hide furniture
show/hide fixtures
show/hide confidence overlay
show/hide measurements
show/hide inferred surfaces
show/hide wall labels
```

---

# 11. Output Formats

The system should export:

```text
JSON measurement file
2D floor plan
3D model
PDF report
SVG plan
DXF/CAD export
IFC/BIM-style export later
```

Apple RoomPlan is a useful reference because it outputs USD or USDZ files and includes dimensions of recognised room components. ([Apple Developer][1])

For construction/BIM-style exports, IFC is worth studying because it already has structured concepts for spaces, doors, windows, openings, and building elements. ([standards.buildingsmart.org][5])

---

# 12. Suggested JSON Data Model

```json
{
  "project": {
    "id": "house_scan_001",
    "sourceType": "video",
    "scaleMethod": "manual_reference",
    "scaleReference": {
      "type": "known_door_height",
      "value": 1.981,
      "unit": "metres"
    }
  },
  "rooms": [
    {
      "id": "room_001",
      "name": "Living Room",
      "surfaces": [
        {
          "id": "floor_001",
          "type": "floor",
          "geometry": "polygon",
          "area": 18.4,
          "confidence": 0.93
        },
        {
          "id": "wall_001",
          "type": "wall",
          "geometry": "plane",
          "length": 4.2,
          "height": 2.4,
          "area": 10.08,
          "confidence": 0.9
        }
      ],
      "openings": [
        {
          "id": "door_001",
          "type": "door",
          "attachedTo": "wall_001",
          "width": 0.762,
          "height": 1.981,
          "distanceFromLeftWallEdge": 0.42,
          "distanceFromRightWallEdge": 2.86,
          "distanceFromFloor": 0,
          "distanceFromCeiling": 0.41,
          "confidence": 0.88
        },
        {
          "id": "window_001",
          "type": "window",
          "attachedTo": "wall_002",
          "width": 1.25,
          "height": 1.05,
          "distanceFromLeftWallEdge": 0.68,
          "distanceFromRightWallEdge": 1.94,
          "distanceFromFloor": 0.92,
          "distanceFromCeiling": 0.43,
          "confidence": 0.84
        }
      ],
      "fixtures": [
        {
          "id": "socket_001",
          "type": "plug_socket",
          "attachedTo": "wall_001",
          "distanceFromFloor": 0.36,
          "distanceFromNearestCorner": 1.42,
          "confidence": 0.72
        },
        {
          "id": "vent_001",
          "type": "ventilation",
          "attachedTo": "wall_003",
          "distanceFromFloor": 2.05,
          "distanceFromNearestCorner": 0.51,
          "confidence": 0.79
        }
      ],
      "specialGeometry": [
        {
          "id": "under_stair_001",
          "type": "under_stair_space",
          "geometry": "triangular_prism",
          "floorArea": 1.85,
          "usableVolume": 2.4,
          "lowestHeight": 0.12,
          "highestHeight": 2.05,
          "confidence": 0.7
        }
      ]
    }
  ]
}
```

---

# 13. Processing Architecture

```text
Video Importer
→ Frame Extractor
→ Frame Quality Filter
→ Camera Reconstruction Engine
→ Point Cloud Builder
→ Plane Detection Engine
→ Room Surface Builder
→ Object/Furniture Segmentation
→ Door/Window Detector
→ Fixture Detector
→ Scale Calibration Engine
→ Measurement Engine
→ Confidence Engine
→ 2D/3D Renderer
→ Export Engine
```

## Main Technical Components

| Component             | Purpose                                              |
| --------------------- | ---------------------------------------------------- |
| Video importer        | Accepts existing room videos                         |
| Frame extractor       | Pulls usable frames from video                       |
| Blur filter           | Removes bad frames                                   |
| SfM/MVS engine        | Reconstructs camera movement and 3D structure        |
| Point cloud processor | Builds 3D point data                                 |
| Plane detector        | Finds walls, floors, ceilings, angled planes         |
| Segmentation model    | Separates furniture and objects                      |
| Object detector       | Finds doors, windows, sockets, vents, lights         |
| Geometry fitter       | Converts noisy point clouds into clean room surfaces |
| Scale engine          | Applies real-world measurement scale                 |
| Confidence engine     | Marks reliable vs estimated areas                    |
| Renderer              | Generates 3D visual result                           |
| Exporter              | Outputs JSON, PDF, SVG, CAD, or 3D files             |

---

# 14. AI Detection Categories

The AI model should be trained or fine-tuned to detect domestic room features.

## Structural Categories

```text
wall
floor
ceiling
stairs
skirting board
door opening
window opening
alcove
chimney breast
under-stair slope
```

## Fixed Fixture Categories

```text
plug socket
light switch
wall light
ceiling light
vent
extractor fan
radiator
thermostat
alarm sensor
fuse box
network port
TV aerial port
```

## Movable Categories

```text
sofa
bed
chair
table
wardrobe
box
curtain
rug
lamp
plant
temporary object
```

Object detection and segmentation frameworks such as Detectron2 and YOLO are relevant examples because they support visual detection and segmentation workflows. ([GitHub][7])

---

# 15. User Review Workflow

The system should include a human correction stage.

Suggested flow:

```text
1. Upload video
2. System processes room
3. System shows 3D room model
4. User confirms scale
5. User checks wall corners
6. User checks doors/windows
7. User checks sockets/lights/vents
8. User accepts or edits measurements
9. System exports final report
```

Manual correction is important because videos may have:

```text
bad lighting
blur
mirrors
furniture blocking walls
blank walls with little texture
missing corners
fast camera movement
partial views of windows or doors
```

---

# 16. Measurement Report Example

```text
Room: Living Room

Main Measurements:
- Floor area: 18.4m²
- Ceiling height: 2.41m
- Wall A length: 4.21m — high confidence
- Wall B length: 3.86m — high confidence
- Wall C length: 4.18m — medium confidence
- Wall D length: 3.84m — medium confidence

Openings:
- Door 1: 0.76m × 1.98m
  - 0.42m from left wall edge
  - 0.41m from ceiling
  - high confidence

- Window 1: 1.25m × 1.05m
  - 0.68m from left wall edge
  - 0.92m from floor
  - 0.43m from ceiling
  - medium confidence

Fixtures:
- Plug socket 1:
  - 0.36m from floor
  - 1.42m from nearest corner
  - medium confidence

- Wall light 1:
  - 1.72m from floor
  - 0.94m from nearest corner
  - medium confidence

Special Geometry:
- Under-stair space:
  - Floor area: 1.85m²
  - Usable volume: 2.4m³
  - Lowest height: 0.12m
  - Highest height: 2.05m
  - medium/low confidence
```

---

# 17. Reference Examples

These are useful examples to study:

| Example                 | Why it matters                                                                                                                     |
| ----------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| Apple RoomPlan          | Good reference for room scanning, LiDAR, dimensions, recognised room components, and USD/USDZ output. ([Apple Developer][1])       |
| Google ARCore Depth API | Useful reference for depth maps, depth-from-motion, ToF sensors, and scene distance data. ([Google for Developers][8])             |
| COLMAP                  | Useful reference for reconstructing 3D structure from video frames or image collections. ([colmap.github.io][2])                   |
| Open3D                  | Useful for point cloud processing and plane detection. ([open3d.org][3])                                                           |
| Meta SAM 2              | Useful for image/video segmentation, furniture masking, and object tracking across frames. ([AI Meta][6])                          |
| Detectron2 / YOLO       | Useful examples of object detection and segmentation frameworks. ([GitHub][7])                                                     |
| IFC Door / IFC Window   | Useful references for structured building model exports involving doors, windows, and openings. ([standards.buildingsmart.org][5]) |

---

# 18. Possible Future System Names or Modules

If this became part of a larger software/language ecosystem, the modules could be split like this:

```text
room-video-import
room-frame-extract
room-depth-reconstruct
room-plane-detect
room-feature-detect
room-fixture-detect
room-measure
room-confidence
room-render-3d
room-export
```

For an LogicN-style package naming approach:

```text
LogicN-vision-room
LogicN-vision-depth
LogicN-vision-fixtures
LogicN-spatial-measure
LogicN-spatial-render
LogicN-building-ifc
LogicN-video-reconstruct
```

---

# 19. Key Design Rule

The system should always separate:

```text
seen geometry
inferred geometry
manual geometry
```

Example:

```text
Seen:
- Window edges visible in 12 frames

Inferred:
- Wall behind sofa estimated from visible wall edges

Manual:
- User entered known door height of 1.981m
```

This makes the system more trustworthy, because it does not pretend that every measurement is equally certain.

The final goal is not just to create a 3D model. The goal is to create a **measured, editable, confidence-scored room model** from existing room videos.

[1]: https://developer.apple.com/augmented-reality/roomplan/ "RoomPlan Overview - Augmented Reality - Apple Developer"
[2]: https://colmap.github.io/ "COLMAP — COLMAP 4.1.0.dev0 | 43dd3bb2 (2026-03-16) documentation"
[3]: https://www.open3d.org/docs/latest/tutorial/Basic/pointcloud.html "Point Cloud — Open3D latest (664eff5) documentation"
[4]: https://standards.buildingsmart.org/IFC/DEV/IFC4_2/FINAL/HTML/schema/ifcsharedbldgelements/lexical/ifcdoor.htm "IfcDoor"
[5]: https://standards.buildingsmart.org/IFC/DEV/IFC4_2/FINAL/HTML/schema/ifcsharedbldgelements/lexical/ifcwindow.htm "IfcWindow"
[6]: https://ai.meta.com/research/sam2/?utm_source=chatgpt.com "Introducing Meta Segment Anything Model 2 (SAM 2)"
[7]: https://github.com/facebookresearch/detectron2?utm_source=chatgpt.com "Detectron2 is a platform for object detection, segmentation ..."
[8]: https://developers.google.com/ar/develop/depth "Depth adds realism  |  ARCore  |  Google for Developers"
