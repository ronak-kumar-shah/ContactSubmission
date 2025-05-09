using ContactApi.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;

var builder = WebApplication.CreateBuilder(args);
// Register DbContext with PostgreSQL connection string
// Right now on VDI, installation and port opening issues are there for postgreSQL
// So, Planning to use EF Core InMemory provider
// builder.Services.AddDbContext<AppDbContext>(options =>
//     options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

// Use InMemory DB
// Read the flag from configuration to choose between InMemory and PostgreSQL
bool useInMemory = builder.Configuration.GetValue<bool>("UseInMemoryDatabase");

builder.Services.AddDbContext<AppDbContext>(options =>
{
    if (useInMemory)
    {
        options.UseInMemoryDatabase("ContactDb");
    }
    else
    {
        options.UseNpgsql(builder.Configuration.GetConnectionString("ConnectionStringForContactForm"));
    }
});

// Add controller services
builder.Services.AddControllers();
builder.Services.AddCors();

// Configure Swagger with XML comments
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo { Title = "Contact API", Version = "v1" });

    // Include XML comments for Swagger
    var xmlFile = $"{System.Reflection.Assembly.GetExecutingAssembly().GetName().Name}.xml";
    var xmlPath = Path.Combine(AppContext.BaseDirectory, xmlFile);
    if (File.Exists(xmlPath))
    {
        c.IncludeXmlComments(xmlPath);
    }
});

var app = builder.Build();

// Enable CORS globally
app.UseCors(policy => policy.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());

// Enable Swagger middleware
if (app.Environment.IsDevelopment() || true) // force enable for simplicity
{
    app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "Contact API V1");
        c.RoutePrefix = "swagger"; // URL: /swagger
    });
}

// Map controller routes
app.MapControllers();

app.Run();