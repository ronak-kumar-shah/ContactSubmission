# Use the official .NET SDK image to build the app
FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build

# Set working directory
WORKDIR /src

# Copy the project file and restore dependencies
COPY contact-app-backend/ContactApi/*.csproj ./ContactApi/
RUN dotnet restore ./ContactApi/ContactApi.csproj

# Copy the rest of the application code
COPY contact-app-backend/ContactApi/. ./ContactApi/

# Build and publish the app to the /app directory
WORKDIR /src/ContactApi
RUN dotnet publish -c Release -o /app/publish

# Use the official .NET runtime image for running the app
FROM mcr.microsoft.com/dotnet/aspnet:7.0 AS runtime

# Set working directory in the container
WORKDIR /app

# Copy published files from the build stage
COPY --from=build /app/publish .

# Expose the default port (adjust if different in your appsettings)
EXPOSE 5203

# Start the application
ENTRYPOINT ["dotnet", "ContactApi.dll"]
