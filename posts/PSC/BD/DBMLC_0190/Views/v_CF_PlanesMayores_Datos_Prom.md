# View: v_CF_PlanesMayores_Datos_Prom

## Usa los objetos:
- [[CF_PlanesMayores_Bancos]]
- [[CF_PlanesMayores_Datos]]

```sql
CREATE VIEW [dbo].[v_CF_PlanesMayores_Datos_Prom] as 
SELECT Año,					Mes,						IdEmpresa,					IdBanco, 
	NombreBanco,			NombreBancoAlterno,			Linea,						Fabrica,			
	NombreGeneral,			SumValorSinCosto,			PromValorSinCosto,			SumValorConCosto,		
	PromValorConCosto, 		SumValorSinCostoRep,		PromValorSinCostoRep,		SumValorConCostoRep,
	PromValorConCostoRep,
	SumValorTotal = SUM(SumValorSinCosto + SumValorConCosto + SumValorSinCostoRep + SumValorConCostoRep),
	PromValorTotal = SUM(PromValorSinCosto + PromValorConCosto + PromValorSinCostoRep + PromValorConCostoRep)

FROM
(
	SELECT Año = YEAR(Fecha),		Mes = MONTH(Fecha),			IdEmpresa,			D.IdBanco, 
		b.NombreBanco,				B.NombreBancoAlterno,		Linea,				Fabrica,			
		NombreGeneral = CONCAT(b.NombreBancoAlterno, ' - ', d.Fabrica),
		SumValorSinCosto = SUM(ISNULL(ValorSinCosto,0)),			PromValorSinCosto = AVG(ISNULL(ValorSinCosto,0)),
		SumValorConCosto = SUM(ISNULL(ValorConCosto,0)),			PromValorConCosto = AVG(ISNULL(ValorConCosto,0)),
		SumValorSinCostoRep = SUM(ISNULL(ValorsinCostoRep,0)),		PromValorSinCostoRep = AVG(ISNULL(ValorsinCostoRep,0)),
		SumValorConCostoRep = SUM(ISNULL(ValorConCostoRep,0)),		PromValorConCostoRep = AVG(ISNULL(ValorConCostoRep,0))
	FROM CF_PlanesMayores_Datos d
	LEFT JOIN CF_PlanesMayores_Bancos  b on d.IdBanco = b.IdBanco
	GROUP BY YEAR(Fecha), MONTH(Fecha), IdEmpresa, d.IdBanco, NombreBanco, B.NombreBancoAlterno, linea, Fabrica
) A
GROUP BY Año,					Mes,						IdEmpresa,					IdBanco, 
		NombreBanco,			NombreBancoAlterno,			Linea,						Fabrica,			
		NombreGeneral,			SumValorSinCosto,			PromValorSinCosto,			SumValorConCosto,		
		PromValorConCosto, 		SumValorSinCostoRep,		PromValorSinCostoRep,		SumValorConCostoRep,
		PromValorConCostoRep

```
