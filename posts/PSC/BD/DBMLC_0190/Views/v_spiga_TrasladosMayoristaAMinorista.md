# View: v_spiga_TrasladosMayoristaAMinorista

## Usa los objetos:
- [[spiga_TrasladosMayoristaAMinorista]]

```sql

CREATE VIEW v_spiga_TrasladosMayoristaAMinorista
AS
SELECT	A.IdSincronizacionSpiga, A.IdConsecutivo, A.Ano_Periodo, A.Mes_Periodo, A.FechaDeCorte, A.ValorCompra, A.GastosIS, 	
		TarifaPVC = isnull(CASE WHEN (A.TarifaPVC IS NULL)
			THEN (SELECT TOP 1 TarifaPVC FROM [PSCService_DB].[dbo].[spiga_TrasladosMayoristaAMinorista] 
			WHERE VIN = A.VIN and FechaAlta < A.FechaAlta AND TarifaPVC IS NOT NULL ORDER BY FechaAlta DESC)
			ELSE A.TarifaPVC END, 0),
		A.FechaRecepcionReal, A.FechaSalidaReal, A.CodCentro, A.CodEmpresa, A.CodGama, A.CodMarca, A.CodModelo, A.CodUbicacionAnterior,
		A.CodUbicacion, A.Estado,A.Expediente, A.Gama, A.Marca, A.Modelo, A.NombreEmpresa, A.NombreCentro, A.UbicacionAnterior, A.Ubicacion,
		A.VIN, A.FechaAlta
FROM ( SELECT * FROM [PSCService_DB].[dbo].[spiga_TrasladosMayoristaAMinorista] )A

```
