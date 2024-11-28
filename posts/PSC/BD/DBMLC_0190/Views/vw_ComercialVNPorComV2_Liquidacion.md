# View: vw_ComercialVNPorComV2_Liquidacion

## Usa los objetos:
- [[Empleados]]
- [[vw_ComercialVNPorComV2_3]]

```sql










CREATE VIEW [dbo].[vw_ComercialVNPorComV2_Liquidacion]
AS
SELECT        

dbo.vw_ComercialVNPorComV2_3.Ano_Periodo, 
dbo.vw_ComercialVNPorComV2_3.Mes_Periodo, 
dbo.vw_ComercialVNPorComV2_3.CodigoEmpresa, 
dbo.vw_ComercialVNPorComV2_3.Empresa, 
dbo.vw_ComercialVNPorComV2_3.CedulaVendedor, 
dbo.Empleados.CodigoEmpleado, 
dbo.Empleados.Nombres + N' ' + dbo.Empleados.Apellido1 + N' ' + dbo.Empleados.Apellido2 AS NombreVendedor, 
dbo.Empleados.Nombres + N' ' + dbo.Empleados.Apellido1 + N' ' + dbo.Empleados.Apellido2 AS Empleado, 
dbo.Empleados.FechaRetiro, 

dbo.vw_ComercialVNPorComV2_3.CodigoMarcaGrupo, 
dbo.vw_ComercialVNPorComV2_3.MarcaGrupo, 
						 
MAX(dbo.vw_ComercialVNPorComV2_3.VehiculosRecaudados) AS VehiculosRecaudados, 
SUM(dbo.vw_ComercialVNPorComV2_3.ValorComision) AS ComisionRecaudo, 
SUM(dbo.vw_ComercialVNPorComV2_3.ModeloVehSinComision) AS ModelosVehSinComision, 
						 
dbo.vw_ComercialVNPorComV2_3.IdRangoMaestra, 
dbo.vw_ComercialVNPorComV2_3.IdComisionModeloSub, 

0 AS IdLiquidacion, 
0 AS IdHistorico, 
GETDATE() AS FechaLiquidacion

FROM     

dbo.Empleados 
INNER JOIN 
dbo.vw_ComercialVNPorComV2_3 
ON dbo.Empleados.CodigoEmpleado = dbo.vw_ComercialVNPorComV2_3.CedulaVendedor

GROUP BY 

dbo.vw_ComercialVNPorComV2_3.Ano_Periodo, 
dbo.vw_ComercialVNPorComV2_3.Mes_Periodo, 
dbo.vw_ComercialVNPorComV2_3.CodigoEmpresa,
dbo.vw_ComercialVNPorComV2_3.Empresa, 
dbo.vw_ComercialVNPorComV2_3.CedulaVendedor, 
dbo.Empleados.CodigoEmpleado,
dbo.Empleados.Nombres + N' ' + dbo.Empleados.Apellido1 + N' ' + dbo.Empleados.Apellido2, 
dbo.Empleados.FechaRetiro,

dbo.vw_ComercialVNPorComV2_3.CodigoMarcaGrupo, 
dbo.vw_ComercialVNPorComV2_3.MarcaGrupo, 

dbo.vw_ComercialVNPorComV2_3.IdRangoMaestra, 
dbo.vw_ComercialVNPorComV2_3.IdComisionModeloSub 


```
