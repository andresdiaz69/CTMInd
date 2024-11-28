# View: vw_spiga_Empleados

## Usa los objetos:
- [[spiga_Empleados]]

```sql

CREATE VIEW [dbo].[vw_spiga_Empleados] AS
SELECT --isnull(ROW_NUMBER()over (order by Idterceeros desc), -1) as 
orden, IdEmpleados,IdTerceros,NifCif,Nombre,Apellido1,Apellido2 
FROM 
(
	SELECT distinct orden=isnull(ROW_NUMBER()over (partition by Idempleados order by Idterceros desc), 0),IdEmpleados,IdTerceros,NifCif,Nombre,Apellido1,Apellido2
	FROM [PSCService_db].[dbo].[spiga_Empleados]
	 --where   NifCif IN ('93413871')

) A where  orden=1
--NifCif IN ('93413871')




```
