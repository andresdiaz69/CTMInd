# Table: ComisionesSpigaInformacionCreditos

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| Id | uniqueidentifier | NO |
| IdComisionSpiga | int | NO |
| Ano_Periodo | int | NO |
| Mes_Periodo | int | NO |
| IdEmpresas | smallint | NO |
| Empresa | nvarchar | NO |
| IdCentros | smallint | YES |
| Centro | nvarchar | YES |
| IdSecciones | int | YES |
| Seccion | nvarchar | YES |
| Ambito | nvarchar | NO |
| TipoFactura | nvarchar | NO |
| SerieFactura | nvarchar | NO |
| NumFactura | nvarchar | NO |
| AñoFactura | nvarchar | NO |
| FechaFactura | datetime2 | YES |
| NIT | nvarchar | YES |
| Nombre | nvarchar | NO |
| Apellido1 | nvarchar | YES |
| Apellido2 | nvarchar | YES |
| Matricula | nvarchar | YES |
| VIN | nvarchar | YES |
| NombreMarca | nvarchar | NO |
| NombreGama | nvarchar | NO |
| CodModelo | nvarchar | YES |
| Modelo | nvarchar | YES |
| BaseImponible | decimal | YES |
| Impuesto | decimal | YES |
| Total | decimal | YES |
| Empleado | nvarchar | YES |
| CedulaEmpleado | bigint | YES |
