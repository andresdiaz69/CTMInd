# View: v_CF_PlanesMayores_Datos

## Usa los objetos:
- [[CF_PlanesMayores_Bancos]]
- [[CF_PlanesMayores_Datos]]

```sql
CREATE VIEW [dbo].[v_CF_PlanesMayores_Datos] AS
SELECT Año = YEAR(Fecha),		Mes = MONTH(Fecha),			Fecha,						IdEmpresa,			
	D.IdBanco,					b.NombreBanco,				B.NombreBancoAlterno,		Linea,				
	Fabrica,				
	ValorSinCosto = ISNULL(ValorSinCosto,0),
	ValorConCosto = ISNULL(ValorConCosto,0), 
	ValorSinCostoRep = ISNULL(ValorSinCostoRep,0),
	ValorConCostoRep = ISNULL(ValorConCostoRep,0),
	NombreGeneral = CONCAT(b.NombreBancoAlterno, ' - ', d.Fabrica)
FROM CF_PlanesMayores_Datos d
LEFT JOIN CF_PlanesMayores_Bancos  b on d.IdBanco = b.IdBanco

```
