# View: vw_alerta_OTByCargoInforme

## Usa los objetos:
- [[vw_alerta_OTByCargo]]

```sql

CREATE VIEW [dbo].[vw_alerta_OTByCargoInforme]
AS
SELECT DISTINCT 
                         dbo.vw_alerta_OTByCargo.Ano_Periodo, dbo.vw_alerta_OTByCargo.Mes_Periodo, dbo.vw_alerta_OTByCargo.IdEmpresas, dbo.vw_alerta_OTByCargo.NombreEmpresa, dbo.vw_alerta_OTByCargo.SiglaEmpresa, 
                         dbo.vw_alerta_OTByCargo.CentroSigla, dbo.vw_alerta_OTByCargo.DiasRango, 
						 
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

FROM            dbo.vw_alerta_OTByCargo LEFT OUTER JOIN
                             (SELECT        Ano_Periodo, Mes_Periodo, IdEmpresas, CentroSigla, DiasRango, ValorTotal, Cantidad
                               FROM            dbo.vw_alerta_OTByCargo AS vw_alerta_OTByCargo_1
                               WHERE        (IDCargoTipo = 5)) AS Clientes ON dbo.vw_alerta_OTByCargo.DiasRango = Clientes.DiasRango AND dbo.vw_alerta_OTByCargo.CentroSigla = Clientes.CentroSigla AND 
                         dbo.vw_alerta_OTByCargo.IdEmpresas = Clientes.IdEmpresas AND dbo.vw_alerta_OTByCargo.Ano_Periodo = Clientes.Ano_Periodo AND dbo.vw_alerta_OTByCargo.Mes_Periodo = Clientes.Mes_Periodo LEFT OUTER JOIN
                             (SELECT        Ano_Periodo, Mes_Periodo, IdEmpresas, CentroSigla, DiasRango, ValorTotal, Cantidad
                               FROM            dbo.vw_alerta_OTByCargo AS vw_alerta_OTByCargo_1
                               WHERE        (IDCargoTipo = 4)) AS Aseguradoras ON dbo.vw_alerta_OTByCargo.Ano_Periodo = Aseguradoras.Ano_Periodo AND dbo.vw_alerta_OTByCargo.Mes_Periodo = Aseguradoras.Mes_Periodo AND 
                         dbo.vw_alerta_OTByCargo.IdEmpresas = Aseguradoras.IdEmpresas AND dbo.vw_alerta_OTByCargo.CentroSigla = Aseguradoras.CentroSigla AND 
                         dbo.vw_alerta_OTByCargo.DiasRango = Aseguradoras.DiasRango LEFT OUTER JOIN
                             (SELECT        Ano_Periodo, Mes_Periodo, IdEmpresas, CentroSigla, DiasRango, ValorTotal, Cantidad
                               FROM            dbo.vw_alerta_OTByCargo AS vw_alerta_OTByCargo_1
                               WHERE        (IDCargoTipo = 3)) AS Interno ON dbo.vw_alerta_OTByCargo.DiasRango = Interno.DiasRango AND dbo.vw_alerta_OTByCargo.CentroSigla = Interno.CentroSigla AND 
                         dbo.vw_alerta_OTByCargo.IdEmpresas = Interno.IdEmpresas AND dbo.vw_alerta_OTByCargo.Mes_Periodo = Interno.Mes_Periodo AND 
                         dbo.vw_alerta_OTByCargo.Ano_Periodo = Interno.Ano_Periodo LEFT OUTER JOIN
                             (SELECT        Ano_Periodo, Mes_Periodo, IdEmpresas, CentroSigla, DiasRango, ValorTotal, Cantidad
                               FROM            dbo.vw_alerta_OTByCargo AS vw_alerta_OTByCargo_1
                               WHERE        (IDCargoTipo = 2)) AS GarantiaAmpliada ON dbo.vw_alerta_OTByCargo.DiasRango = GarantiaAmpliada.DiasRango AND dbo.vw_alerta_OTByCargo.CentroSigla = GarantiaAmpliada.CentroSigla AND 
                         dbo.vw_alerta_OTByCargo.IdEmpresas = GarantiaAmpliada.IdEmpresas AND dbo.vw_alerta_OTByCargo.Mes_Periodo = GarantiaAmpliada.Mes_Periodo AND 
                         dbo.vw_alerta_OTByCargo.Ano_Periodo = GarantiaAmpliada.Ano_Periodo LEFT OUTER JOIN
                             (SELECT        Ano_Periodo, Mes_Periodo, IdEmpresas, CentroSigla, DiasRango, ValorTotal, Cantidad
                               FROM            dbo.vw_alerta_OTByCargo AS vw_alerta_OTByCargo_1
                               WHERE        (IDCargoTipo = 1)) AS Garantia ON dbo.vw_alerta_OTByCargo.DiasRango = Garantia.DiasRango AND dbo.vw_alerta_OTByCargo.CentroSigla = Garantia.CentroSigla AND 
                         dbo.vw_alerta_OTByCargo.IdEmpresas = Garantia.IdEmpresas AND dbo.vw_alerta_OTByCargo.Mes_Periodo = Garantia.Mes_Periodo AND 
                         dbo.vw_alerta_OTByCargo.Ano_Periodo = Garantia.Ano_Periodo



```
