# View: vw_alerta_OTByCargoInformeGlobal_ConEstado

## Usa los objetos:
- [[vw_alerta_OTByCargoInforme_ConEstado]]

```sql

CREATE VIEW [dbo].[vw_alerta_OTByCargoInformeGlobal_ConEstado]
AS
SELECT        Ano_Periodo, Mes_Periodo, IdEmpresas, NombreEmpresa, SiglaEmpresa, CentroSigla, EstadoActual, SUM(ValorTotal_Garantia) AS ValorTotal_Garantia, SUM(Cantidad_Garantia) 
                         AS Cantidad_Garantia, SUM(ValorTotal_GarantiaAmpliada) AS ValorTotal_GarantiaAmpliada, SUM(Cantidad_GarantiaAmpliada) AS Cantidad_GarantiaAmpliada, SUM(ValorTotal_Interno) AS ValorTotal_Interno, 
                         SUM(Cantidad_Interno) AS Cantidad_Interno, SUM(ValorTotal_Aseguradoras) AS ValorTotal_Aseguradoras, SUM(Cantidad_Aseguradoras) AS Cantidad_Aseguradoras, SUM(ValorTotal_Clientes) 
                         AS ValorTotal_Clientes, SUM(Cantidad_Clientes) AS Cantidad_Clientes, SUM(ValorTotal_Global) AS ValorTotal_Global, SUM(Cantidad_Global) AS Cantidad_Global
FROM            dbo.vw_alerta_OTByCargoInforme_ConEstado
--WHERE        (DiasRango > 0)
GROUP BY Ano_Periodo, Mes_Periodo, IdEmpresas, NombreEmpresa, SiglaEmpresa, CentroSigla, EstadoActual



```
