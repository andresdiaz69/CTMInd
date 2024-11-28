# View: vw_cMandos_InventarioRepuestosResumidoAnterior

## Usa los objetos:
- [[spiga_InventarioRepuestosResumido]]

```sql


CREATE VIEW [dbo].[vw_cMandos_InventarioRepuestosResumidoAnterior]
AS
SELECT IdConsecutivo, Ano_Periodo, Mes_Periodo, FechaDeCorte, IdEmpresas CodigoEmpresa, NombreEmpresa,
	case when IdCentros=28 then (idCentros*1000)+IdSecciones else idCentros end CodigoCentro, 
	NombreCentro, IdSecciones CodigoSeccion, DescripcionSeccion, IdMR, DescripcionMR, IdClasificacion1, 
	DescripcionClasificacion1, Fecha, Stock, ValorPM, ValorCosto, ValorTarifa, NumLineas, ValorMedioReservado, 
	ValorDepreciado, IdTarifas, ValorMedioTREPdte
FROM PSCService_DB.dbo.spiga_InventarioRepuestosResumido

```
