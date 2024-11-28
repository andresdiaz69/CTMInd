# View: vw_Presupuestos_PyGPre

## Usa los objetos:
- [[InformesDefinitivos]]
- [[vw_Presupuestos_CentrosPorLinea]]
- [[vw_Presupuestos_PresentacionesVsLineas]]

```sql
CREATE VIEW [dbo].[vw_Presupuestos_PyGPre] AS

-- =============================================
-- Control de Cambios
-- 2024|10|07 - Alexis - Creado para listar los valores de las presentaciones
-- 2024|10|11 - Alexis - Se adiciona el join de Linea y Centros
-- Modulo - Presupuestos
-- =============================================

SELECT	CodigoPresentacion,				Año,						Mes,						Orden,					Balance,
		Nivel1,							Nivel2,						Nivel3,						Nivel4, 				Nivel5,
		Nivel6,							CodigoConcepto,				NombreConcepto,				CodigoLinea,			NombreLinea,
		CodSede,						Sede,						ValorAnt,					PorcentajeAnt,			ValorAct,
		PorcentajeAct,					Presupuesto, 				PrePorcentaje 
FROM (
	SELECT	A.CodigoPresentacion,			Año,						Mes,						Orden,					Balance,
			Nivel1,							Nivel2,						Nivel3,						Nivel4, 				Nivel5,
			Nivel6,							CodigoConcepto,				NombreConcepto,				B.CodigoLinea,			B.NombreLinea,
			CodSede = c.CodCentro,			Sede,						ValorAnt,					PorcentajeAnt,			ValorAct,
			PorcentajeAct,					Presupuesto, 				PrePorcentaje
	FROM (
		SELECT	CodigoPresentacion,			Año = Año2,				Mes = MesFinal2,		Orden,				Balance,
				Nivel1,						Nivel2,					Nivel3,					Nivel4,				Nivel5,
				Nivel6,						CodigoConcepto,			NombreConcepto, 		ValorAnt,			PorcentajeAnt,
				ValorAct,					PorcentajeAct,			Presupuesto,			PrePorcentaje,
				Sede = CASE WHEN (Sede LIKE '%RN-Bta-Cl.80%') THEN 'RN-Bta-San Fernando'
							WHEN (Sede LIKE '%VW-Bta-Aut.Sur%') THEN 'VW-Bta-Administrativo VW'
							WHEN (Sede LIKE '%FRL-Villavo-Anillo Vial%')THEN 'FRL-Villavo-Anillo Víal'
							WHEN (Sede LIKE '%FRL-Ibague Mirolindo%')THEN 'FRL-Ibague-Mirolindo'
							WHEN (Sede LIKE'%FRL-Sogamoso Calle 17%')THEN 'FRL-Sogamoso-Calle 17'
							WHEN (Sede LIKE'%VO-Bta-BL-Calle 170%')THEN 'VO-Bta-BL Calle 170'
							WHEN (Sede LIKE'%VO-Bta-BL-Puente Aranda%')THEN 'VO-Bta-BL Puente Aranda'
							WHEN (Sede LIKE'MIT-Bta-Mayorista Vehiculos')THEN 'MIT-Bta-Mayorista Vehiculos'
							ELSE LTRIM(RTRIM(Sede)) END				
				
		FROM [InformesComiteDB].dbo.[InformesDefinitivos]
		CROSS APPLY (
			VALUES
				(sede1,		Anterior1,		AntPorcentaje1,		Actual1,	ActPorcentaje1,		Presupuesto1,	PrePorcentaje1),
				(sede2,		Anterior2,		AntPorcentaje2,		Actual2,	ActPorcentaje2,		Presupuesto2,	PrePorcentaje2),
				(sede3,		Anterior3,		AntPorcentaje3,		Actual3,	ActPorcentaje3,		Presupuesto3,	PrePorcentaje3),
				(sede4,		Anterior4,		AntPorcentaje4,		Actual4,	ActPorcentaje4,		Presupuesto4,	PrePorcentaje4),
				(sede5,		Anterior5,		AntPorcentaje5,		Actual5,	ActPorcentaje5,		Presupuesto5,	PrePorcentaje5),
				(sede6,		Anterior6,		AntPorcentaje6,		Actual6,	ActPorcentaje6,		Presupuesto6,	PrePorcentaje6),
				(sede7,		Anterior7,		AntPorcentaje7,		Actual7,	ActPorcentaje7,		Presupuesto7,	PrePorcentaje7),
				(sede8,		Anterior8,		AntPorcentaje8,		Actual8,	ActPorcentaje8,		Presupuesto8,	PrePorcentaje8),
				(sede9,		Anterior9,		AntPorcentaje9,		Actual9,	ActPorcentaje9,		Presupuesto9,	PrePorcentaje9),
				(sede10,	Anterior10,		AntPorcentaje10,	Actual10,	ActPorcentaje10,	Presupuesto10,	PrePorcentaje10),
				(sede11,	Anterior11,		AntPorcentaje11,	Actual11,	ActPorcentaje11,	Presupuesto11,	PrePorcentaje11),
				(sede12,	Anterior12,		AntPorcentaje12,	Actual12,	ActPorcentaje12,	Presupuesto12,	PrePorcentaje12),
				(sede13,	Anterior13,		AntPorcentaje13,	Actual13,	ActPorcentaje13,	Presupuesto13,	PrePorcentaje13),
				(sede14,	Anterior14,		AntPorcentaje14,	Actual14,	ActPorcentaje14,	Presupuesto14,	PrePorcentaje14),
				(sede15,	Anterior15,		AntPorcentaje15,	Actual15,	ActPorcentaje15,	Presupuesto15,	PrePorcentaje15),
				(sede16,	Anterior16,		AntPorcentaje16,	Actual16,	ActPorcentaje16,	Presupuesto16,	PrePorcentaje16),
				(sede17,	Anterior17,		AntPorcentaje17,	Actual17,	ActPorcentaje17,	Presupuesto17,	PrePorcentaje17),
				(sede18,	Anterior18,		AntPorcentaje18,	Actual18,	ActPorcentaje18,	Presupuesto18,	PrePorcentaje18),
				(sede19,	Anterior19,		AntPorcentaje19,	Actual19,	ActPorcentaje19,	Presupuesto19,	PrePorcentaje19),
				(sede20,	Anterior20,		AntPorcentaje20,	Actual20,	ActPorcentaje20,	Presupuesto20,	PrePorcentaje20),
				(sede21,	Anterior21,		AntPorcentaje21,	Actual21,	ActPorcentaje21,	Presupuesto21,	PrePorcentaje21),
				(sede22,	Anterior22,		AntPorcentaje22,	Actual22,	ActPorcentaje22,	Presupuesto22,	PrePorcentaje22),
				(sede23,	Anterior23,		AntPorcentaje23,	Actual23,	ActPorcentaje23,	Presupuesto23,	PrePorcentaje23),
				(sede24,	Anterior24,		AntPorcentaje24,	Actual24,	ActPorcentaje24,	Presupuesto24,	PrePorcentaje24),
				(sede25,	Anterior25,		AntPorcentaje25,	Actual25,	ActPorcentaje25,	Presupuesto25,	PrePorcentaje25)
		) AS Sedes(Sede, ValorAnt, PorcentajeAnt, ValorAct, PorcentajeAct, Presupuesto, PrePorcentaje)
		WHERE Balance = 17 
		  AND Año2 >= 2023
		  AND MesFinal1 = MesFinal2
		  AND Sede <> ''
	) AS A
	inner JOIN vw_Presupuestos_PresentacionesVsLineas	AS B ON A.CodigoPresentacion = B.CodigoPresentacion
	LEFT JOIN  vw_Presupuestos_CentrosPorLinea			AS C ON A.Sede = C.NombreCentro
	--replace(replace(LTRIM(RTRIM(A.Sede)),' ',''),'-','') = replace(LTRIM(RTRIM(C.NombreCentro)),'-','')
) AS A
--WHERE (Año = 2024)--AND (Mes = 9) AND (CodigoLinea = 406) --AND (CodSede = 1)

```
