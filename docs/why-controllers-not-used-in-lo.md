<!-- LO Documentation -->
<!-- 
-->

# Why Controllers Should Not Be Used in LO

When building applications using the Logic-Oriented (LO) framework, it's essential to follow best practices to ensure your code is secure, maintainable, and efficient. One crucial aspect of LO development is the use of routes, actions, policies, effects, and generated reports.

## Why Controllers Should Not Be Used

Controllers are a traditional approach used in many frameworks, but they can hide security rules, permissions, validation, and effects within them. This makes it challenging for AI assistants to understand the code and for developers to maintain it.

In contrast, using routes, actions, policies, effects, and generated reports explicitly promotes a more secure and maintainable design. By separating concerns and making each part of the application responsible for its specific task, we can achieve better security, readability, and performance.

## Benefits of Route-First and Contract-First Approach

Using the route-first and contract-first approach with typed route actions or handlers has several benefits:

*   **Security**: By declaring security rules, permissions, and effects explicitly in the route definition, we can ensure that our application is secure.
*   **Readability**: The code becomes more readable as each part of the application has a specific responsibility, making it easier for developers to understand and maintain.
*   **Performance**: By compiling routes into a static route graph, LO applications can achieve better performance.

## Conclusion

When building LO applications, it's essential to follow best practices and use the recommended approach. This includes using routes, actions, policies, effects, and generated reports explicitly instead of traditional MVC Controllers. By doing so, we can ensure our code is secure, maintainable, and efficient.