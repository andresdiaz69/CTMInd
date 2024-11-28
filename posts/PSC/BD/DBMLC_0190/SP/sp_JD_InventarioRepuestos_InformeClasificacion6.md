# Stored Procedure: sp_JD_InventarioRepuestos_InformeClasificacion6

## Usa los objetos:
- [[JD_InventarioRepuestos]]
- [[spiga_TrasladosDeRepuestosPendientes]]
- [[UnidadDeNegocio]]

```sql
CREATE PROC [dbo].[sp_JD_InventarioRepuestos_InformeClasificacion6] 
(
	@Ano_Periodo int, 
	@MesPeriodo int
)AS
BEGIN
	--declare @Ano_Periodo int, @MesPeriodo int
	--SET @Ano_Periodo = 2021
	--SET @MesPeriodo = 9


	SELECT Ano_Periodo,Mes_Periodo,IdEMpresas,IdClasificacion6,DenominacionClasificacion6,IdCentros,nombrecentro,ValorPM=SUM(ValorPM)
	FROM 
	(
	SELECT a.Ano_Periodo,a.Mes_Periodo,a.IdEMpresas,a.IdMarcas,a.NombreMarca,a.IdCentros,a.NombreCentro,a.IdReferencias,a.IdClasificacion6,
		a.DenominacionClasificacion6,ValorPM=SUM(a.ValorPM)+ISNULL(b.ValorMedioMovimiento,0), ValorMedioMovimiento=ISNULL(b.ValorMedioMovimiento,0)
	FROM 
	(
		SELECT Ano_Periodo,Mes_Periodo,IdEMpresas,IdMarcas,NombreMarca,IdCentros,NombreCentro,IdSecciones,NombreSeccion, 
			IdReferencias,IdClasificacion6,DenominacionClasificacion6,ValorPM=PrecioMedio*stock
		FROM JD_InventarioRepuestos 
		WHERE Ano_Periodo = @Ano_Periodo AND Mes_Periodo = @MesPeriodo
	) a
	LEFT JOIN 
	(
		SELECT Ano_Periodo,Mes_Periodo,IdEmpresas_Entrada,IdCentros_Entrada,CodigoMarca,NombreMarca,CodSeccion,
			NombreSeccion,NombreCentro,Referencia,ValorMedioMovimiento			
		FROM 
		(
			SELECT Ano_Periodo,Mes_Periodo,IdEmpresas_Entrada,IdCentros_Entrada,NombreMarca,CodSeccion,
				NombreSeccion,NombreCentro,Referencia,
				CASE WHEN NombreMarca='JD Agricola' THEN 410
					WHEN NombreMarca='Wirtgen' THEN 520
					WHEN NombreMarca='JD Construccion' THEN 411
					END CodigoMarca,ValorMedioMovimiento=SUM([ValorBruto])
			FROM
			(
				SELECT Ano_Periodo,Mes_Periodo,IdEmpresas_Entrada,IdCentros_Entrada,MR,Referencia,
					ValorBruto,b.CodSeccion,b.nombreseccion,
					CASE WHEN a.MR IN ('BEN','CIB','HAM','KLE','VOG','WIR') THEN 'Wirtgen' 
						ELSE b.nombreunidadnegocio END 'NombreMarca',b.Nombrecentro
				FROM [PSCService_DB].[dbo].[spiga_TrasladosDeRepuestosPendientes] a
				LEFT JOIN 
				(
					SELECT CodSeccion,nombreseccion,nombreunidadnegocio,nombrecentro 
					FROM DBMLC_0190.dbo.UnidadDeNegocio
				) b	ON a.IdSecciones_Entrada = b.CodSeccion
				WHERE idcentros_Entrada in (21,25,124,22,65,46,18,16,49,44,29,149,41,26)
			)a
			GROUP BY Ano_Periodo,Mes_Periodo,IdEmpresas_Entrada,IdCentros_Entrada,NombreMarca,CodSeccion,
				NombreSeccion,NombreCentro,Referencia
		)b
		WHERE Ano_Periodo = @Ano_Periodo and Mes_Periodo = @MesPeriodo
	) b
	ON a.Ano_Periodo=b.Ano_Periodo AND
	a.Mes_Periodo = b.Mes_Periodo AND
	a.IdMarcas = b.CodigoMarca AND
	a.IdCentros = b.IdCentros_Entrada AND
	a.IdSecciones = b.CodSeccion AND
	a.IdReferencias = b.Referencia
	GROUP BY a.Ano_Periodo,a.Mes_Periodo,a.IdEMpresas,a.IdMarcas,a.NombreMarca,a.IdCentros,a.NombreCentro,a.IdReferencias,
		b.ValorMedioMovimiento,a.IdClasificacion6,a.DenominacionClasificacion6
	) a 
	WHERE ValorPM > 0 --and a.IdMarcas = 410 and idCentros = 124 
	
	GROUP BY Ano_Periodo,Mes_Periodo,IdEMpresas,IdClasificacion6,DenominacionClasificacion6,IdCentros,nombrecentro
END

```
