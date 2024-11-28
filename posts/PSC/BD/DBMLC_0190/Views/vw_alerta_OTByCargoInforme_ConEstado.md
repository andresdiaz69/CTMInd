# View: vw_alerta_OTByCargoInforme_ConEstado

## Usa los objetos:
- [[vw_alerta_OTByCargo_ConEstado]]

```sql


CREATE VIEW [dbo].[vw_alerta_OTByCargoInforme_ConEstado]
AS
SELECT DISTINCT 
                         dbo.vw_alerta_OTByCargo_ConEstado.Ano_Periodo, dbo.vw_alerta_OTByCargo_ConEstado.Mes_Periodo, dbo.vw_alerta_OTByCargo_ConEstado.IdEmpresas, dbo.vw_alerta_OTByCargo_ConEstado.NombreEmpresa, dbo.vw_alerta_OTByCargo_ConEstado.SiglaEmpresa, 
                         dbo.vw_alerta_OTByCargo_ConEstado.CentroSigla, dbo.vw_alerta_OTByCargo_ConEstado.DiasRango, dbo.vw_alerta_OTByCargo_ConEstado.EstadoActual,
						 
						 ISNULL(Garantia.ValorTotal, 0) AS ValorTotal_Garantia, 
                         ISNULL(Garantia.Cantidad, 0) AS Cantidad_Garantia, 
						 ISNULL(GarantiaAmpliada.ValorTotal, 0) AS ValorTotal_GarantiaAmpliada, 
						 ISNULL(GarantiaAmpliada.Cantidad, 0) AS Cantidad_GarantiaAmpliada, 
                         ISNULL(Interno.ValorTotal, 0) AS ValorTotal_Interno, 
						 ISNULL(Interno.Cantidad, 0) AS Cantidad_Interno, 
						 ISNULL(Aseguradoras.ValorTotal, 0) AS ValorTotal_Aseguradoras, 
                         ISNULL(Aseguradoras.Cantidad, 0) AS Cantidad_Aseguradoras, 
						 ISNULL(Clientes.ValorTotal, 0) AS ValorTotal_Clientes, 
						 ISNULL(Clientes.Cantidad, 0) AS Cantidad_Clientes,

						 ISNULL(Garantia.ValorTotal, 0) + ISNULL(GarantiaAmpliada.ValorTotal, 0) + ISNULL(Interno.ValorTotal, 0) + ISNULL(Aseguradoras.ValorTotal, 0) + ISNULL(Clientes.ValorTotal, 0) AS ValorTotal_Global,
						 ISNULL(Garantia.Cantidad, 0) + ISNULL(GarantiaAmpliada.Cantidad, 0) + ISNULL(Interno.Cantidad, 0) + ISNULL(Aseguradoras.Cantidad, 0) + ISNULL(Clientes.Cantidad, 0) AS Cantidad_Global

FROM            dbo.vw_alerta_OTByCargo_ConEstado LEFT OUTER JOIN
                             (SELECT        Ano_Periodo, Mes_Periodo, IdEmpresas, CentroSigla, DiasRango, EstadoActual, ValorTotal, Cantidad
                               FROM            dbo.vw_alerta_OTByCargo_ConEstado AS vw_alerta_OTByCargo_ConEstado_1
                               WHERE        (IDCargoTipo = 5)) AS Clientes ON dbo.vw_alerta_OTByCargo_ConEstado.DiasRango = Clientes.DiasRango AND dbo.vw_alerta_OTByCargo_ConEstado.CentroSigla = Clientes.CentroSigla AND dbo.vw_alerta_OTByCargo_ConEstado.EstadoActual = Clientes.EstadoActual AND 
                         dbo.vw_alerta_OTByCargo_ConEstado.IdEmpresas = Clientes.IdEmpresas AND dbo.vw_alerta_OTByCargo_ConEstado.Ano_Periodo = Clientes.Ano_Periodo AND dbo.vw_alerta_OTByCargo_ConEstado.Mes_Periodo = Clientes.Mes_Periodo LEFT OUTER JOIN
                             (SELECT        Ano_Periodo, Mes_Periodo, IdEmpresas, CentroSigla, DiasRango, EstadoActual, ValorTotal, Cantidad
                               FROM            dbo.vw_alerta_OTByCargo_ConEstado AS vw_alerta_OTByCargo_ConEstado_1
                               WHERE        (IDCargoTipo = 4)) AS Aseguradoras ON dbo.vw_alerta_OTByCargo_ConEstado.Ano_Periodo = Aseguradoras.Ano_Periodo AND dbo.vw_alerta_OTByCargo_ConEstado.Mes_Periodo = Aseguradoras.Mes_Periodo AND dbo.vw_alerta_OTByCargo_ConEstado.EstadoActual = Aseguradoras.EstadoActual AND 
                         dbo.vw_alerta_OTByCargo_ConEstado.IdEmpresas = Aseguradoras.IdEmpresas AND dbo.vw_alerta_OTByCargo_ConEstado.CentroSigla = Aseguradoras.CentroSigla AND 
                         dbo.vw_alerta_OTByCargo_ConEstado.DiasRango = Aseguradoras.DiasRango LEFT OUTER JOIN
                             (SELECT        Ano_Periodo, Mes_Periodo, IdEmpresas, CentroSigla, DiasRango, EstadoActual, ValorTotal, Cantidad
                               FROM            dbo.vw_alerta_OTByCargo_ConEstado AS vw_alerta_OTByCargo_ConEstado_1
                               WHERE        (IDCargoTipo = 3)) AS Interno ON dbo.vw_alerta_OTByCargo_ConEstado.DiasRango = Interno.DiasRango AND dbo.vw_alerta_OTByCargo_ConEstado.CentroSigla = Interno.CentroSigla AND dbo.vw_alerta_OTByCargo_ConEstado.EstadoActual = Interno.EstadoActual AND  
                         dbo.vw_alerta_OTByCargo_ConEstado.IdEmpresas = Interno.IdEmpresas AND dbo.vw_alerta_OTByCargo_ConEstado.Mes_Periodo = Interno.Mes_Periodo AND 
                         dbo.vw_alerta_OTByCargo_ConEstado.Ano_Periodo = Interno.Ano_Periodo LEFT OUTER JOIN
                             (SELECT        Ano_Periodo, Mes_Periodo, IdEmpresas, CentroSigla, DiasRango, EstadoActual, ValorTotal, Cantidad
                               FROM            dbo.vw_alerta_OTByCargo_ConEstado AS vw_alerta_OTByCargo_ConEstado_1
                               WHERE        (IDCargoTipo = 2)) AS GarantiaAmpliada ON dbo.vw_alerta_OTByCargo_ConEstado.DiasRango = GarantiaAmpliada.DiasRango AND dbo.vw_alerta_OTByCargo_ConEstado.CentroSigla = GarantiaAmpliada.CentroSigla AND dbo.vw_alerta_OTByCargo_ConEstado.EstadoActual = GarantiaAmpliada.EstadoActual AND 
                         dbo.vw_alerta_OTByCargo_ConEstado.IdEmpresas = GarantiaAmpliada.IdEmpresas AND dbo.vw_alerta_OTByCargo_ConEstado.Mes_Periodo = GarantiaAmpliada.Mes_Periodo AND 
                         dbo.vw_alerta_OTByCargo_ConEstado.Ano_Periodo = GarantiaAmpliada.Ano_Periodo LEFT OUTER JOIN
                             (SELECT        Ano_Periodo, Mes_Periodo, IdEmpresas, CentroSigla, DiasRango, EstadoActual, ValorTotal, Cantidad
                               FROM            dbo.vw_alerta_OTByCargo_ConEstado AS vw_alerta_OTByCargo_ConEstado_1
                               WHERE        (IDCargoTipo = 1)) AS Garantia ON dbo.vw_alerta_OTByCargo_ConEstado.DiasRango = Garantia.DiasRango AND dbo.vw_alerta_OTByCargo_ConEstado.CentroSigla = Garantia.CentroSigla AND dbo.vw_alerta_OTByCargo_ConEstado.EstadoActual = Garantia.EstadoActual AND  
                         dbo.vw_alerta_OTByCargo_ConEstado.IdEmpresas = Garantia.IdEmpresas AND dbo.vw_alerta_OTByCargo_ConEstado.Mes_Periodo = Garantia.Mes_Periodo AND 
                         dbo.vw_alerta_OTByCargo_ConEstado.Ano_Periodo = Garantia.Ano_Periodo



```
