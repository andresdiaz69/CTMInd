# View: vw_ComisionesFinanciacionAsesores_DetalleComprobante

## Usa los objetos:
- [[RangosMaestras]]
- [[spiga_Empleados]]
- [[vw_ComisionesFinanciacionAsesores]]

```sql

CREATE VIEW [dbo].[vw_ComisionesFinanciacionAsesores_DetalleComprobante] AS


SELECT * FROM
(

SELECT DISTINCT vw_ComisionesFinanciacionAsesores.*, convert(bigint,LTRIM(RTRIM(spigaEmpleados.NifCif))) as CodigoEmpleado  from vw_ComisionesFinanciacionAsesores
LEFT JOIN PSCService_DB..spiga_Empleados AS spigaEmpleados 
ON ISNUMERIC(spigaEmpleados.NifCif) = 1  and vw_ComisionesFinanciacionAsesores.IdEmpleados = Convert(bigint,spigaEmpleados.IdEmpleados) 

WHERE  spigaEmpleados.Ano_Periodo = YEAR(GETDATE())
AND spigaEmpleados.Mes_Periodo = case when @@SERVERNAME = 'CTZFRANCA-060\TEST' OR @@SERVERNAME = 'CTZFRANCA-060\DESARROLLO' then MONTH(GETDATE())-1  else MONTH(GETDATE()) end 

)AS T
where LTRIM(RTRIM(IdTercerosFinanciera))
IN
( 
SELECT DISTINCT LTRIM(RTRIM(SUBSTRING(RangosMaestras.NombreMaestra , 1, (CHARINDEX('/',RangosMaestras.NombreMaestra )-1)))) AS IdTercerosFinanciera 
FROM RangosMaestras 
WHERE (RangosMaestras.IdComisionModeloSub = 76 and RangosMaestras.IdComisionModeloSubCriterio = 143)
OR (RangosMaestras.IdComisionModeloSub = 92 and RangosMaestras.IdComisionModeloSubCriterio = 172)
) 



```
