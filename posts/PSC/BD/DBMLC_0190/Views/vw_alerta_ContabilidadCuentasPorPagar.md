# View: vw_alerta_ContabilidadCuentasPorPagar

## Usa los objetos:
- [[alerta_ContabilidadEmpresasRelevantes]]
- [[alerta_ContabilidadEmpresasTipos]]
- [[vw_alerta_ContabilidadByCuentaCuentasPorPagar]]
- [[vw_alerta_CuentasPorPagarByTercero]]

```sql

CREATE VIEW [dbo].[vw_alerta_ContabilidadCuentasPorPagar]
AS
SELECT        RESULTADO.Ano_Periodo, RESULTADO.Mes_Periodo, RESULTADO.IdEmpresas, RESULTADO.Empresa, RESULTADO.SiglaEmpresa, RESULTADO.IDSpiga, RESULTADO.Cuenta, RESULTADO.Saldo, RESULTADO.Valor, 
                         RESULTADO.Diferencia, RESULTADO.ExisteEnContabilidad, RESULTADO.ExisteEnCuentasPorPagar, 
						 
						 CASE 
						 WHEN (ExisteEnContabilidad = 1) AND (ExisteEnCuentasPorPagar = 1) AND (Diferencia = 0) THEN 1 
						 WHEN (Diferencia > - 10000) AND (Diferencia < 10000) AND (Diferencia <> 0) THEN 2 
						 WHEN ((ExisteEnContabilidad = 1) AND (ExisteEnCuentasPorPagar = 0) AND (Diferencia <= - 10000)) OR ((ExisteEnContabilidad = 1) AND (ExisteEnCuentasPorPagar = 0) AND (Diferencia >= 10000)) THEN 3 
						 WHEN ((ExisteEnCuentasPorPagar = 1) AND (ExisteEnContabilidad = 0) AND (Diferencia <= - 10000)) OR ((ExisteEnCuentasPorPagar = 1) AND (ExisteEnContabilidad = 0) AND (Diferencia >= 10000)) THEN 4 
						 WHEN ((ExisteEnContabilidad = 1) AND (ExisteEnCuentasPorPagar = 1) AND (Diferencia <= - 10000)) OR ((ExisteEnContabilidad = 1) AND (ExisteEnCuentasPorPagar = 1) AND (Diferencia >= 10000)) THEN 5 
						 ELSE 0 
						 END AS IDConcepto, 
						 
						 CASE 
						 WHEN (ExisteEnContabilidad = 1) AND (ExisteEnCuentasPorPagar = 1) AND (Diferencia = 0) THEN 'Terceros en Módulo y Contabilidad Sin Diferencia' 
						 WHEN (Diferencia > - 10000) AND (Diferencia < 10000) AND (Diferencia <> 0) THEN 'Diferencia No Significativa (Entre $-10.000 y $10.000)' 
						 WHEN ((ExisteEnContabilidad = 1) AND (ExisteEnCuentasPorPagar = 0) AND (Diferencia <= - 10000)) OR ((ExisteEnContabilidad = 1) AND (ExisteEnCuentasPorPagar = 0) AND (Diferencia >= 10000)) THEN 'Terceros Únicamente en Contabilidad' 
						 WHEN ((ExisteEnCuentasPorPagar = 1) AND (ExisteEnContabilidad = 0) AND (Diferencia <= - 10000)) OR ((ExisteEnCuentasPorPagar = 1) AND (ExisteEnContabilidad = 0) AND (Diferencia >= 10000)) THEN 'Terceros Únicamente en Módulo' 
						 WHEN ((ExisteEnContabilidad = 1) AND (ExisteEnCuentasPorPagar = 1) AND (Diferencia <= - 10000)) OR ((ExisteEnContabilidad = 1) AND (ExisteEnCuentasPorPagar = 1) AND (Diferencia >= 10000)) THEN 'Diferencia Significativa' 
						 ELSE 'Sólo en Contabilidad con Saldo 0' 
						 END AS Concepto, 


						 
						 CASE WHEN dbo.alerta_ContabilidadEmpresasTipos.IDTipo IS NOT NULL THEN dbo.alerta_ContabilidadEmpresasTipos.IDTipo ELSE 1 END AS IDTipo, 
                         CASE WHEN dbo.alerta_ContabilidadEmpresasTipos.Tipo IS NOT NULL THEN dbo.alerta_ContabilidadEmpresasTipos.Tipo ELSE 'CARTERA CORRIENTE' END AS Tipo, 
						 CASE WHEN dbo.alerta_ContabilidadEmpresasTipos.TipoSigla IS NOT NULL THEN dbo.alerta_ContabilidadEmpresasTipos.TipoSigla ELSE 'CTE' END AS TipoSigla

FROM            dbo.alerta_ContabilidadEmpresasTipos INNER JOIN
                         dbo.alerta_ContabilidadEmpresasRelevantes ON dbo.alerta_ContabilidadEmpresasTipos.IDTipo = dbo.alerta_ContabilidadEmpresasRelevantes.IDTipo RIGHT OUTER JOIN
                             (SELECT        ISNULL(dbo.vw_alerta_ContabilidadByCuentaCuentasPorPagar.Ano_Periodo, dbo.vw_alerta_CuentasPorPagarByTercero.Ano_Periodo) AS Ano_Periodo, ISNULL(dbo.vw_alerta_ContabilidadByCuentaCuentasPorPagar.Mes_Periodo, 
                                                         dbo.vw_alerta_CuentasPorPagarByTercero.Mes_Periodo) AS Mes_Periodo, ISNULL(dbo.vw_alerta_ContabilidadByCuentaCuentasPorPagar.IdEmpresas, dbo.vw_alerta_CuentasPorPagarByTercero.IdEmpresas) AS IdEmpresas, 
                                                         ISNULL(dbo.vw_alerta_ContabilidadByCuentaCuentasPorPagar.Empresa, dbo.vw_alerta_CuentasPorPagarByTercero.Empresa) AS Empresa, ISNULL(dbo.vw_alerta_ContabilidadByCuentaCuentasPorPagar.SiglaEmpresa, 
                                                         dbo.vw_alerta_CuentasPorPagarByTercero.SiglaEmpresa) AS SiglaEmpresa, ISNULL(dbo.vw_alerta_ContabilidadByCuentaCuentasPorPagar.IDSpiga, dbo.vw_alerta_CuentasPorPagarByTercero.IDSpiga) AS IDSpiga, 
                                                         ISNULL(dbo.vw_alerta_ContabilidadByCuentaCuentasPorPagar.Cuenta, dbo.vw_alerta_CuentasPorPagarByTercero.Tercero) AS Cuenta, 
														 
														 (ISNULL(dbo.vw_alerta_ContabilidadByCuentaCuentasPorPagar.Saldo, 0) * -1) AS Saldo, 
                                                         ISNULL(dbo.vw_alerta_CuentasPorPagarByTercero.Valor, 0) AS Valor, 
														 (ISNULL(dbo.vw_alerta_ContabilidadByCuentaCuentasPorPagar.Saldo, 0) * -1) - ISNULL(dbo.vw_alerta_CuentasPorPagarByTercero.Valor, 0) AS Diferencia, 

                                                         CASE WHEN dbo.vw_alerta_ContabilidadByCuentaCuentasPorPagar.Ano_Periodo IS NOT NULL THEN 1 ELSE 0 END AS ExisteEnContabilidad, 
                                                         CASE WHEN dbo.vw_alerta_CuentasPorPagarByTercero.Ano_Periodo IS NOT NULL THEN 1 ELSE 0 END AS ExisteEnCuentasPorPagar
                               FROM            dbo.vw_alerta_ContabilidadByCuentaCuentasPorPagar FULL OUTER JOIN
                                                         dbo.vw_alerta_CuentasPorPagarByTercero ON dbo.vw_alerta_ContabilidadByCuentaCuentasPorPagar.SiglaEmpresa = dbo.vw_alerta_CuentasPorPagarByTercero.SiglaEmpresa AND 
                                                         dbo.vw_alerta_ContabilidadByCuentaCuentasPorPagar.Empresa = dbo.vw_alerta_CuentasPorPagarByTercero.Empresa AND 
                                                         dbo.vw_alerta_ContabilidadByCuentaCuentasPorPagar.Mes_Periodo = dbo.vw_alerta_CuentasPorPagarByTercero.Mes_Periodo AND 
                                                         dbo.vw_alerta_ContabilidadByCuentaCuentasPorPagar.Ano_Periodo = dbo.vw_alerta_CuentasPorPagarByTercero.Ano_Periodo AND 
                                                         dbo.vw_alerta_ContabilidadByCuentaCuentasPorPagar.IdEmpresas = dbo.vw_alerta_CuentasPorPagarByTercero.IdEmpresas AND 
                                                         dbo.vw_alerta_ContabilidadByCuentaCuentasPorPagar.IDSpiga = dbo.vw_alerta_CuentasPorPagarByTercero.IDSpiga) AS RESULTADO ON dbo.alerta_ContabilidadEmpresasRelevantes.IDSpiga = RESULTADO.IDSpiga









```
