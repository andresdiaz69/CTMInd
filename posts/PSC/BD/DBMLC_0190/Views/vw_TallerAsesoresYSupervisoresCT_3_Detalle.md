# View: vw_TallerAsesoresYSupervisoresCT_3_Detalle

## Usa los objetos:
- [[ComisionesSpigaTallerPorOT]]
- [[Empleados]]
- [[vw_VariablesVersiones]]

```sql

CREATE VIEW [dbo].[vw_TallerAsesoresYSupervisoresCT_3_Detalle]
AS
SELECT        Totalizacion.Ano_Periodo, Totalizacion.Mes_Periodo, CASE WHEN Totalizacion.CodigoEmpresa <> Empleados.CodigoEmpresa THEN Empleados.CodigoEmpresa ELSE Totalizacion.CodigoEmpresa END AS CodigoEmpresa, 
                         Totalizacion.CodigoEmpresa AS CodigoEmpresaOT, dbo.Empleados.CodigoEmpresa AS CodigoEmpresaEmpleado, Totalizacion.CedulaAsesorServicioResponsable, Totalizacion.NumeroFacturaTaller, Totalizacion.NumOT, 
                         [VAR].ValorVariable, SUM(Totalizacion.ValorNeto) AS ValorNeto_MO
FROM            (SELECT        Ano_Periodo, Mes_Periodo, CodigoEmpresa, CedulaAsesorServicioResponsable, NumeroFacturaTaller, NumOT, ValorUnitario * UnidadesVendidas - (ValorUnitario * UnidadesVendidas) * (PorcentajeDescuento / 100) 
                                                    AS ValorNeto
                          FROM            dbo.ComisionesSpigaTallerPorOT
                          WHERE        (TipoOperacion <> 'MAT')) AS Totalizacion LEFT OUTER JOIN
                         dbo.Empleados ON Totalizacion.CedulaAsesorServicioResponsable = dbo.Empleados.CodigoEmpleado CROSS JOIN
                             (SELECT        ValorVariable
                               FROM            dbo.vw_VariablesVersiones
                               WHERE        (IdVariable = 1)) AS [VAR]
GROUP BY Totalizacion.Ano_Periodo, Totalizacion.Mes_Periodo, Totalizacion.CodigoEmpresa, Totalizacion.CedulaAsesorServicioResponsable, Totalizacion.NumeroFacturaTaller, Totalizacion.NumOT, [VAR].ValorVariable, 
                         CASE WHEN Totalizacion.CodigoEmpresa <> Empleados.CodigoEmpresa THEN Empleados.CodigoEmpresa ELSE Totalizacion.CodigoEmpresa END, dbo.Empleados.CodigoEmpresa


```
