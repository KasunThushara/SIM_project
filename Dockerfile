# Use the official Maven image to build the project
FROM maven:3.9.6-eclipse-temurin-21 AS build
WORKDIR /app

# Copy source code and pom.xml
COPY pom.xml .
COPY src ./src

# Build the application
RUN mvn clean package -DskipTests

# Use a JDK 21 runtime to run the packaged application
FROM eclipse-temurin:21-jdk
WORKDIR /app

# Copy the built jar file from the Maven build
COPY --from=build /app/target/*.jar app.jar

# Expose the port Spring Boot runs on
EXPOSE 8080

# Run the Spring Boot app
ENTRYPOINT ["java", "-jar", "app.jar"]
