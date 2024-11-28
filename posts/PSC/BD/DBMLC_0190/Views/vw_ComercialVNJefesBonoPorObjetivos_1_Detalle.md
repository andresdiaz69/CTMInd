# View: vw_ComercialVNJefesBonoPorObjetivos_1_Detalle

## Usa los objetos:
- [[vw_ComercialVNJefesBonoPorObjetivos_1]]
- [[vw_ComercialVNPorCom_1_Jefes]]

```sql


CREATE VIEW [dbo].[vw_ComercialVNJefesBonoPorObjetivos_1_Detalle]
AS
SELECT        dbo.vw_ComercialVNJefesBonoPorObjetivos_1.Ano_Periodo, dbo.vw_ComercialVNJefesBonoPorObjetivos_1.Mes_Periodo, dbo.vw_ComercialVNJefesBonoPorObjetivos_1.CodigoEmpleado, 
                         dbo.vw_ComercialVNJefesBonoPorObjetivos_1.Empleado, dbo.vw_ComercialVNJefesBonoPorObjetivos_1.FechaRetiro, dbo.vw_ComercialVNJefesBonoPorObjetivos_1.CodigoEmpresa, 
                         dbo.vw_ComercialVNJefesBonoPorObjetivos_1.Empresa, dbo.vw_ComercialVNJefesBonoPorObjetivos_1.CodigoCentro, dbo.vw_ComercialVNJefesBonoPorObjetivos_1.Centro, 
                         dbo.vw_ComercialVNJefesBonoPorObjetivos_1.VehiculosRecaudados, dbo.vw_ComercialVNJefesBonoPorObjetivos_1.IdLiquidacion, dbo.vw_ComercialVNJefesBonoPorObjetivos_1.IdHistorico, 
                         dbo.vw_ComercialVNPorCom_1_Jefes.NumeroFactura, dbo.vw_ComercialVNPorCom_1_Jefes.VIN, dbo.vw_ComercialVNPorCom_1_Jefes.CodigoModelo, dbo.vw_ComercialVNPorCom_1_Jefes.Modelo, 
                         dbo.vw_ComercialVNPorCom_1_Jefes.CedulaVendedor, dbo.vw_ComercialVNPorCom_1_Jefes.NombreVendedor
FROM            dbo.vw_ComercialVNJefesBonoPorObjetivos_1 LEFT OUTER JOIN
                         dbo.vw_ComercialVNPorCom_1_Jefes ON dbo.vw_ComercialVNJefesBonoPorObjetivos_1.Centro = dbo.vw_ComercialVNPorCom_1_Jefes.Centro AND 
                         dbo.vw_ComercialVNJefesBonoPorObjetivos_1.CodigoCentro = dbo.vw_ComercialVNPorCom_1_Jefes.CodigoCentro AND 
                         dbo.vw_ComercialVNJefesBonoPorObjetivos_1.Empresa = dbo.vw_ComercialVNPorCom_1_Jefes.Empresa AND 
                         dbo.vw_ComercialVNJefesBonoPorObjetivos_1.CodigoEmpresa = dbo.vw_ComercialVNPorCom_1_Jefes.CodigoEmpresa AND 
                         dbo.vw_ComercialVNJefesBonoPorObjetivos_1.Ano_Periodo = dbo.vw_ComercialVNPorCom_1_Jefes.Ano_Periodo AND 
                         dbo.vw_ComercialVNJefesBonoPorObjetivos_1.Mes_Periodo = dbo.vw_ComercialVNPorCom_1_Jefes.Mes_Periodo

WHERE        (dbo.vw_ComercialVNPorCom_1_Jefes.FechaEntregaCliente >= '20180701')



```
