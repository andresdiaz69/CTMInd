# View: vw_GestionHumana_FechasCumpleanos

## Usa los objetos:
- [[EmpleadosActivos]]

```sql
CREATE VIEW [dbo].[vw_GestionHumana_FechasCumpleanos]

AS



SELECT * FROM (
SELECT Ano_Periodo, Mes_Periodo, CodigoEmpleado, Nombres, Apellido1, Apellido2, Genero, Fecha_Nacimiento, Fecha_Ingreso, CodigoEmpresa, Empresa, CodigoMarca, Marca, codigo_centro, nombre_centro, codigo_seccion, nombre_seccion, Codigo_Sucursal, 
                         Nombre_Sucursal, codigo_departamento, nombre_departamento, Codigo_Cargo, Nombre_Cargo, Codigo_Cargo_Generico, Nombre_Cargo_generico, email, Codigo_Departamento_trabajo, Nombre_Departamento_trabajo, 
                         Unidad_Negocio, Nombre_Unidad_Negocio, Codigo_Ciudad_trabajo, Nombre_Ciudad_trabajo, MONTH(Fecha_Nacimiento) AS Mes_Cumpleanos
      ,ROW_NUMBER() OVER (
                     PARTITION BY [CodigoEmpleado] 
                     ORDER BY Ano_Periodo desc, Mes_Periodo desc
         	   ) AS [ROW NUMBER]
  FROM EmpleadosActivos WHERE Fecha_Nacimiento IS NOT NULL
  ) groups
WHERE groups.[ROW NUMBER] = 1








```
