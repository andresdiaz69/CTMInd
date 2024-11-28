# View: vw_alerta_ContabilidadCuentasPorCobrar

## Usa los objetos:
- [[alerta_ContabilidadEmpresasRelevantes]]
- [[alerta_ContabilidadEmpresasTipos]]
- [[vw_alerta_ContabilidadByCuentaCuentasPorCobrar]]
- [[vw_alerta_CuentasPorCobrarByTercero]]

```sql
CREATE VIEW [dbo].[vw_alerta_ContabilidadCuentasPorCobrar]
AS
SELECT        RESULTADO.Ano_Periodo, RESULTADO.Mes_Periodo, RESULTADO.IdEmpresas, RESULTADO.Empresa, RESULTADO.SiglaEmpresa, RESULTADO.IDSpiga, RESULTADO.Cuenta, RESULTADO.Saldo, RESULTADO.Valor, 
                         RESULTADO.Diferencia, RESULTADO.ExisteEnContabilidad, RESULTADO.ExisteEnCuentasPorCobrar, 
						 
						 CASE 
						 WHEN (ExisteEnContabilidad = 1) AND (ExisteEnCuentasPorCobrar = 1) AND (Diferencia = 0) THEN 1 
						 WHEN (Diferencia > - 10000) AND (Diferencia < 10000) AND (Diferencia <> 0) THEN 2 
						 WHEN ((ExisteEnContabilidad = 1) AND (ExisteEnCuentasPorCobrar = 0) AND (Diferencia <= - 10000)) OR ((ExisteEnContabilidad = 1) AND (ExisteEnCuentasPorCobrar = 0) AND (Diferencia >= 10000)) THEN 3 
						 WHEN ((ExisteEnCuentasPorCobrar = 1) AND (ExisteEnContabilidad = 0) AND (Diferencia <= - 10000)) OR ((ExisteEnCuentasPorCobrar = 1) AND (ExisteEnContabilidad = 0) AND (Diferencia >= 10000)) THEN 4 
						 WHEN ((ExisteEnContabilidad = 1) AND (ExisteEnCuentasPorCobrar = 1) AND (Diferencia <= - 10000)) OR ((ExisteEnContabilidad = 1) AND (ExisteEnCuentasPorCobrar = 1) AND (Diferencia >= 10000)) THEN 5 
						 ELSE 0 
						 END AS IDConcepto, 
						 
						 CASE 
						 WHEN (ExisteEnContabilidad = 1) AND (ExisteEnCuentasPorCobrar = 1) AND (Diferencia = 0) THEN 'Terceros en Módulo y Contabilidad Sin Diferencia' 
						 WHEN (Diferencia > - 10000) AND (Diferencia < 10000) AND (Diferencia <> 0) THEN 'Diferencia No Significativa (Entre $-10.000 y $10.000)' 
						 WHEN ((ExisteEnContabilidad = 1) AND (ExisteEnCuentasPorCobrar = 0) AND (Diferencia <= - 10000)) OR ((ExisteEnContabilidad = 1) AND (ExisteEnCuentasPorCobrar = 0) AND (Diferencia >= 10000)) THEN 'Terceros Únicamente en Contabilidad' 
						 WHEN ((ExisteEnCuentasPorCobrar = 1) AND (ExisteEnContabilidad = 0) AND (Diferencia <= - 10000)) OR ((ExisteEnCuentasPorCobrar = 1) AND (ExisteEnContabilidad = 0) AND (Diferencia >= 10000)) THEN 'Terceros Únicamente en Módulo' 
						 WHEN ((ExisteEnContabilidad = 1) AND (ExisteEnCuentasPorCobrar = 1) AND (Diferencia <= - 10000)) OR ((ExisteEnContabilidad = 1) AND (ExisteEnCuentasPorCobrar = 1) AND (Diferencia >= 10000)) THEN 'Diferencia Significativa' 
						 ELSE 'Sólo en Contabilidad con Saldo 0' 
						 END AS Concepto, 


						 
						 dbo.alerta_ContabilidadEmpresasTipos.IDTipo, 
                         dbo.alerta_ContabilidadEmpresasTipos.Tipo, dbo.alerta_ContabilidadEmpresasTipos.TipoSigla
FROM            dbo.alerta_ContabilidadEmpresasTipos INNER JOIN
                         dbo.alerta_ContabilidadEmpresasRelevantes ON dbo.alerta_ContabilidadEmpresasTipos.IDTipo = dbo.alerta_ContabilidadEmpresasRelevantes.IDTipo RIGHT OUTER JOIN
                             (SELECT        ISNULL(dbo.vw_alerta_ContabilidadByCuentaCuentasPorCobrar.Ano_Periodo, dbo.vw_alerta_CuentasPorCobrarByTercero.Ano_Periodo) AS Ano_Periodo, ISNULL(dbo.vw_alerta_ContabilidadByCuentaCuentasPorCobrar.Mes_Periodo, 
                                                         dbo.vw_alerta_CuentasPorCobrarByTercero.Mes_Periodo) AS Mes_Periodo, ISNULL(dbo.vw_alerta_ContabilidadByCuentaCuentasPorCobrar.IdEmpresas, dbo.vw_alerta_CuentasPorCobrarByTercero.IdEmpresas) AS IdEmpresas, 
                                                         ISNULL(dbo.vw_alerta_ContabilidadByCuentaCuentasPorCobrar.Empresa, dbo.vw_alerta_CuentasPorCobrarByTercero.Empresa) AS Empresa, ISNULL(dbo.vw_alerta_ContabilidadByCuentaCuentasPorCobrar.SiglaEmpresa, 
                                                         dbo.vw_alerta_CuentasPorCobrarByTercero.SiglaEmpresa) AS SiglaEmpresa, ISNULL(dbo.vw_alerta_ContabilidadByCuentaCuentasPorCobrar.IDSpiga, dbo.vw_alerta_CuentasPorCobrarByTercero.IDSpiga) AS IDSpiga, 
                                                         ISNULL(dbo.vw_alerta_ContabilidadByCuentaCuentasPorCobrar.Cuenta, dbo.vw_alerta_CuentasPorCobrarByTercero.Tercero) AS Cuenta, 
														 
														 ISNULL(dbo.vw_alerta_ContabilidadByCuentaCuentasPorCobrar.Saldo, 0) AS Saldo, 
                                                         ISNULL(dbo.vw_alerta_CuentasPorCobrarByTercero.Valor, 0) AS Valor, 
														 ISNULL(dbo.vw_alerta_ContabilidadByCuentaCuentasPorCobrar.Saldo, 0) - ISNULL(dbo.vw_alerta_CuentasPorCobrarByTercero.Valor, 0) AS Diferencia, 

                                                         CASE WHEN dbo.vw_alerta_ContabilidadByCuentaCuentasPorCobrar.Ano_Periodo IS NOT NULL THEN 1 ELSE 0 END AS ExisteEnContabilidad, 
                                                         CASE WHEN dbo.vw_alerta_CuentasPorCobrarByTercero.Ano_Periodo IS NOT NULL THEN 1 ELSE 0 END AS ExisteEnCuentasPorCobrar
                               FROM            dbo.vw_alerta_ContabilidadByCuentaCuentasPorCobrar FULL OUTER JOIN
                                                         dbo.vw_alerta_CuentasPorCobrarByTercero ON dbo.vw_alerta_ContabilidadByCuentaCuentasPorCobrar.SiglaEmpresa = dbo.vw_alerta_CuentasPorCobrarByTercero.SiglaEmpresa AND 
                                                         dbo.vw_alerta_ContabilidadByCuentaCuentasPorCobrar.Empresa = dbo.vw_alerta_CuentasPorCobrarByTercero.Empresa AND 
                                                         dbo.vw_alerta_ContabilidadByCuentaCuentasPorCobrar.Mes_Periodo = dbo.vw_alerta_CuentasPorCobrarByTercero.Mes_Periodo AND 
                                                         dbo.vw_alerta_ContabilidadByCuentaCuentasPorCobrar.Ano_Periodo = dbo.vw_alerta_CuentasPorCobrarByTercero.Ano_Periodo AND 
                                                         dbo.vw_alerta_ContabilidadByCuentaCuentasPorCobrar.IdEmpresas = dbo.vw_alerta_CuentasPorCobrarByTercero.IdEmpresas AND 
                                                         dbo.vw_alerta_ContabilidadByCuentaCuentasPorCobrar.IDSpiga = dbo.vw_alerta_CuentasPorCobrarByTercero.IDSpiga) AS RESULTADO ON dbo.alerta_ContabilidadEmpresasRelevantes.IDSpiga = RESULTADO.IDSpiga









```
