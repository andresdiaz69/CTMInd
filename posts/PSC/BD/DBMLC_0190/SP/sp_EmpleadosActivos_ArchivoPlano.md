# Stored Procedure: sp_EmpleadosActivos_ArchivoPlano

## Usa los objetos:
- [[EmpleadosActivos]]

```sql

CREATE PROCEDURE [dbo].[sp_EmpleadosActivos_ArchivoPlano](@CodigoEmpleado bigint)
AS
begin

SET FMTONLY OFF;

Select top 1 * from (
 select ROW_NUMBER() OVER(PARTITION BY CodigoEmpleado
 ORDER BY Ano_Periodo desc) as numregistros,
 max( Ano_Periodo) as anio,max(Mes_Periodo) as periodo, CodigoEmpleado,
 codigo_centro,  Codigo_Departamento_trabajo, codigo_seccion, convert(int, CodigoMarca) as CodigoMarca, Codigo_Cargo_Generico,
 Nombre_Cargo_generico
 from EmpleadosActivos 
 group by Ano_Periodo, Mes_Periodo ,CodigoEmpleado, Nombre_Cargo_generico,
  codigo_centro,  Codigo_Departamento_trabajo , codigo_seccion, 
CodigoMarca, Codigo_Cargo_Generico ) as a
WHERE  numregistros =1
and CodigoEmpleado = @CodigoEmpleado
 ORDER BY anio,periodo desc

 end


```
