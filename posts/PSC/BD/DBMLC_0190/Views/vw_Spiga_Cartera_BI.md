# View: vw_Spiga_Cartera_BI

## Usa los objetos:
- [[spiga_cartera]]
- [[v_CF_AgrupacionLinea]]
- [[v_MarginadorMostradorJohnDeere]]
- [[v_MarginadorTallerJohnDeere]]

```sql
CREATE VIEW [dbo].[vw_Spiga_Cartera_BI] AS
SELECT	DISTINCT					A.Ano_Periodo,				A.Mes_Periodo,				A.FechaDeCorte,						A.IdEmpresas, 			
		A.NombreCentro,				A.IdTerceros,				A.NombreTercero,			A.DiaDesde,							A.DiaHasta,
		A.ImporteEfecto,			A.Factura,					A.Sigla,					B.Linea,							A.NumDet,						
		A.AñoAsiento,				A.IdAsientos,				A.FechaVencimiento
FROM 
(
	SELECT	DISTINCT			Ano_Periodo,			Mes_Periodo,			FechaDeCorte,			IdEmpresas, 		
		NombreCentro,			IdTerceros,				NombreTercero,			DiaDesde,				DiaHasta,
		ImporteEfecto,			Factura,				NumDet,					AñoAsiento,				IdAsientos,				
		FechaVencimiento,		
		Sigla = CASE WHEN C.CodMarcaNuevo = 410 THEN 'JD.AGR'
					WHEN C.CodMarcaNuevo = 411 THEN 'JD.CONS'
					WHEN C.CodMarcaNuevo = 520 THEN 'WIR'
					WHEN IdTerceros IN (441634, 245933) THEN 'JD.AGR'
					WHEN IdTerceros IN (245949) THEN 'JD.CONS'
					WHEN IdTerceros IN (931248, 794428, 517951, 517941, 517912, 517972) THEN 'WIR'
					WHEN (NombreCentro LIKE 'JD-Valled%') OR (NombreCentro LIKE 'JD-B/%') OR
						  (NombreCentro LIKE 'JD-It%') OR (NombreCentro LIKE 'JD-Bta-Re%') THEN 'JD.CONS'
					WHEN  NombreCentro LIKE 'JD-Rut%' THEN 'WIR' ELSE 'JD.AGR' END
	FROM (
		SELECT	DISTINCT				Ano_Periodo,				Mes_Periodo,		FechaDeCorte,		IdEmpresas, 
				NombreCentro,			DescripcionSeccion,			IdTerceros,			NombreTercero,		DiaDesde, 
				DiaHasta,				ImporteEfecto,				Factura,			NumDet,				AñoAsiento,
				IdAsientos,				FechaVencimiento
		FROM PSCService_DB.dbo.spiga_cartera
		WHERE NombreCentro LIKE '%JD-%' AND DescripcionSeccion IS NULL AND Ano_Periodo >= 2021
	)A

	LEFT JOIN (
		SELECT DISTINCT CodMarcaNuevo, NumeroFactura 
		FROM (
			SELECT CodMarcaNuevo, NumeroFactura 
			FROM [DBMLC_0190].[dbo].[v_MarginadorMostradorJohnDeere] 			

			UNION ALL

			SELECT CodMarcaNuevo, NumeroFactura
			FROM [DBMLC_0190].[dbo].[v_MarginadorTallerJohnDeere]
		) B
	)C ON A.Factura = C.NumeroFactura

	UNION ALL

	SELECT	DISTINCT			Ano_Periodo,				Mes_Periodo,		FechaDeCorte,			IdEmpresas, 				NombreCentro,			
		IdTerceros,				NombreTercero,				DiaDesde, 			DiaHasta,				ImporteEfecto,				Factura,		
		NumDet,					AñoAsiento,					IdAsientos,			FechaVencimiento,		Sigla =
			CASE WHEN NombreCentro = 'bellpi' THEN 'BELL'
				WHEN NombreCentro IN ('CO-Bta-DAI AV 68','DAI.V-Btá-AV 68','CO-Bta-DAI Calle 71') THEN 'DAI.V'
				WHEN NombreCentro IN ('MIT-Bta-Calle 123','MIT-Bta-Vitrina itinerante sabana') THEN 'MIT'
				WHEN NombreCentro IN ('CO-Villavo-Anillo Vial','CO-Bta-AV 68','CO-B/manga-Cra 27','CO-Cali-Pasoancho') AND DescripcionSeccion LIKE '%MIT%' THEN 'MIT'
				WHEN NombreCentro IN ('CO-Villavo-Anillo Vial','CO-Bta-AV 68','CO-B/manga-Cra 27','CO-Cali-Pasoancho') AND DescripcionSeccion LIKE '%BYD%' THEN 'BYD'
				WHEN NombreCentro IN ('CO-Villavo-Anillo Vial','CO-Bta-AV 68','CO-B/manga-Cra 27','CO-Cali-Pasoancho') THEN 'CO' 
				WHEN NombreCentro = 'CO-Bta-Cll 170 MM' THEN (CASE WHEN DescripcionSeccion LIKE '%DAI%' THEN 'DAI.V' ELSE 'MIT' END)
				WHEN NombreCentro = 'CO-Per-DAI Tierra Buena' THEN (CASE WHEN DescripcionSeccion LIKE '%Dai CV%' THEN 'DAI.C' ELSE 'DAI.V' END)
				WHEN NombreCentro IN ('CO-Bta-Cl 170','CO-Bta-Cra 50','CO-Bta-P. Aranda','CO-Ibague-Mirolindo','CO-Ibague-Z.I. Mirolindo','CO-Villavo-Anillo Vial 1') THEN 'CO'
				WHEN C.Id_Linea IS NOT NULL THEN C.Id_Linea
				WHEN B.Id_Linea IS NOT NULL THEN B.Id_Linea
				END 
	FROM 
	(
		SELECT	DISTINCT				Ano_Periodo,				Mes_Periodo,				FechaDeCorte,				IdEmpresas, 				NombreCentro,
			IdTerceros,					NombreTercero,				DiaDesde,					DiaHasta,					ImporteEfecto,				Factura,
			NumDet,						AñoAsiento,					IdAsientos,					FechaVencimiento,			DescripcionSeccion = 
				CASE WHEN NombreCentro = 'JD-Bta-P. Aranda' AND DescripcionSeccion LIKE '%Boutique JD Puente Aranda%' THEN 'Boutique JD Agrícola Puente Aranda' 
					WHEN NombreCentro = 'JD-Cali-Palmira' AND DescripcionSeccion LIKE '%Taller Mecánica Agrícola JD%' THEN 'Taller Mecánica JD Agrícola Palmira' 
					WHEN (DescripcionSeccion LIKE '%Taller Móvil 1 JD Construcción Carrera 92%') 
						OR (DescripcionSeccion LIKE '%Taller Móvil 2 JD Construccion Carrera 92%') THEN 'Taller Móvil JD Construcción Itagui Carrera 92'
					WHEN (DescripcionSeccion LIKE '%Taller Móvil 1 JD Palmira%') OR (DescripcionSeccion LIKE '%Taller Móvil 2 JD Palmira%') 
						OR (DescripcionSeccion LIKE '%Taller Móvil 3 JD Palmira%') THEN 'Taller Móvil JD Agricola Palmira'
					WHEN NombreCentro = 'JD-Itagui-Cra 92' AND DescripcionSeccion = 'Vitrina Wirtgen Carrera 92' THEN 'Vitrina JD Wirtgen Carrera 92'
					WHEN NombreCentro = 'JD-Itagui-Cra 92' AND DescripcionSeccion LIKE '%Mesa de repuestos JD Itaguí%' THEN 'Mesa de repuestos JD Construcción Itaguí'
					WHEN NombreCentro = 'JD-Itagui-Cra 92' AND DescripcionSeccion LIKE '%Taller Mecánica Agricola Carrera 92%' THEN 'Taller Mecánica JD Agricola Itagui Carrera 92'
					WHEN NombreCentro = 'JD-Itagui-Cra 92' AND DescripcionSeccion LIKE '%Taller Mecánica JD Construccion Carrera 92%' THEN 'Taller Mecánica JD Construccion Itagui Carrera 92'
					WHEN NombreCentro = 'JD-Itagui-Cra 92' AND DescripcionSeccion LIKE '%Taller Mecánica Wirtgen Itagui Carrera 92%' THEN 'Taller Mecánica JD Wirtgen Itagui Carrera 92'
					WHEN NombreCentro = 'JD-Itagui-Cra 92' AND DescripcionSeccion LIKE '%Vitrina JD Construccion Carrera 92%' THEN 'Vitrina JD Construccion Itagui Carrera 92'
					WHEN NombreCentro = 'JD-Yopal-Yopal' AND DescripcionSeccion LIKE '%Mesa de repuestos JD Yopal%' THEN 'Mesa de repuestos JD Agrícola Yopal'
					WHEN (NombreCentro = 'JD-Yopal-Yopal' AND DescripcionSeccion LIKE '%Bodega Yopal%') OR 
						(NombreCentro = 'JD-Yopal-Yopal' AND DescripcionSeccion LIKE '%Bodega JD Yopal%') THEN 'Bodega JD Agrícola Yopal'
					WHEN NombreCentro = 'JD-Valledupar-5 Nov.' AND DescripcionSeccion LIKE '%Vitrina JD Agrícola Valledupar%' THEN 'Vitrina JD Agrícola 5 de Noviembre'
					WHEN NombreCentro = 'JD-Ruta 40' AND DescripcionSeccion NOT LIKE '%JD%' AND DescripcionSeccion LIKE '%Wirtgen%' THEN REPLACE(DescripcionSeccion, 'Wirtgen', 'JD Wirtgen')
					WHEN NombreCentro = 'JD-Neiva-Cra 5' AND DescripcionSeccion LIKE '%Bodega JD Carrera 5%' THEN 'Bodega JD Agrícola Neiva Carrera 5'
					WHEN NombreCentro = 'JD-Neiva-Cra 5' AND DescripcionSeccion LIKE '%Mesa de repuestos JD Neiva%' THEN 'Mesa de repuestos JD Agrícola Neiva'
					WHEN NombreCentro = 'JD-Monteria-Via Cereté ' AND DescripcionSeccion LIKE '%Mesa de repuestos JD Montería%' THEN 'Mesa de repuestos JD Agrícola Montería'
					WHEN DescripcionSeccion LIKE '%Taller Mecánica JD Agrícola Via Cerete%' THEN 'Taller Mecánica JD Agrícola Montería Via Cerete'
					WHEN DescripcionSeccion LIKE '%Taller Mecánica JD Construcción Via Cerete%' THEN 'Taller Mecánica JD Construcción Montería Via Ceret'
					WHEN DescripcionSeccion LIKE '%Vitrina JD Agrícola Via Cerete%' THEN 'Vitrina JD Agrícola Monteria Via Cerete'
					WHEN (NombreCentro = 'JD-Villavo-Anillo Vial 1' AND DescripcionSeccion LIKE '%Bodega JD Agrícola Puente Aranda%') OR
						(NombreCentro = 'JD-Villavo-Anillo Vial 1' AND DescripcionSeccion LIKE '%Bodega JD Torre%') THEN 'Bodega JD Agrícola Torre'
					WHEN NombreCentro = 'JD-Villavo-Anillo Vial 1' AND DescripcionSeccion LIKE '%Mesa de repuestos JD Villavicencio%' THEN 'Mesa de repuestos JD Agrícola Villavicencio'
					WHEN NombreCentro = 'JD-Villavo-Anillo Vial 1' AND DescripcionSeccion LIKE '%Taller Brigada Verde JD Agrícola Anillo Vial 1%' THEN 'Taller JD Agrícola Brigada Verde Anillo Vial 1'
					WHEN NombreCentro = 'JD-Villavo-Anillo Vial 1' AND DescripcionSeccion LIKE '%Vitrina VW Anillo Vial 1%' THEN 'Vitrina JD Agricola Anillo Vial 1'
					WHEN (NombreCentro = 'JD-Villavo-Anillo Vial 1' AND DescripcionSeccion LIKE '%Taller Mecánica Agrícola Yerbabuena%') OR 
						(NombreCentro = 'JD-Villavo-Anillo Vial 1' AND DescripcionSeccion LIKE '%Taller Mecánica JD Anillo Vial 1%') THEN 'Taller Mecánica JD Agrícola Anillo Vial 1'
					WHEN (NombreCentro = 'JD-Villavo-Anillo Vial 1' AND DescripcionSeccion LIKE '%Taller Móvil 1 JD Agrícola Anillo Vial 1%') OR 
						(NombreCentro = 'JD-Villavo-Anillo Vial 1' AND DescripcionSeccion LIKE '%Taller Móvil 4 JD Anillo Vial 1%') THEN 'Taller Móvil JD Agrícola Anillo Vial 1'
					WHEN NombreCentro = 'JD-Chia-Yerbabuena' AND DescripcionSeccion LIKE '%Bodega de Tránsito%' THEN 'Bodega JD Agrícola Yerbabuena'
					WHEN (NombreCentro = 'JD-Chia-Yerbabuena' AND DescripcionSeccion LIKE '%Mesa de repuestos JD Yerbabuena%') OR
						(NombreCentro = 'JD-Chia-Yerbabuena' AND DescripcionSeccion LIKE '%Mesa de repuestos MZ Carrera 30%') THEN 'Mesa de repuestos JD Agrícola Yerbabuena'
					WHEN NombreCentro = 'JD-Chia-Yerbabuena' AND DescripcionSeccion LIKE '%Taller Centro Reparacion Componentes Yerbabuena JD%' THEN 'Taller Centro Reparacion Componentes JD Agrícola Y'
					WHEN NombreCentro = 'JD-Chia-Yerbabuena' AND DescripcionSeccion LIKE '%Taller Móvil JD Forestal Itaguí%' THEN 'Taller Móvil Agrícola Yerbabuena'
					WHEN (NombreCentro = 'JD-Chia-Yerbabuena' AND DescripcionSeccion LIKE '%Vitrina JD Agrícola Cra 5 Neiva%') OR
						(NombreCentro = 'JD-Chia-Yerbabuena' AND DescripcionSeccion LIKE '%Vitrina JD Agricola Anillo Vial 1%') OR
						(NombreCentro = 'JD-Chia-Yerbabuena' AND DescripcionSeccion LIKE '%Vitrina JD Agrícola Palmira%') THEN 'Vitrina JD Agricola Yerbabuena'
					WHEN NombreCentro = 'JD-Chia-Yerbabuena' AND DescripcionSeccion LIKE '%Vitrina VO JD Chía Yerbabuena%' THEN 'Vitrina VO JD Agrícola Chía Yerbabuena'
					WHEN NombreCentro = 'JD-Chia-Yerbabuena' AND DescripcionSeccion LIKE '%Vitrina Wirtgen Yerbabuena%' THEN 'Vitrina JD Wirtgen Yerbabuena'
					WHEN NombreCentro = 'JD-Ibague-ZI Mirolindo' AND DescripcionSeccion LIKE '%Mesa de repuestos JD Ibagué%' THEN 'Mesa de repuestos JD Agrícola Ibagué'
					WHEN NombreCentro = 'JD-Ibague-ZI Mirolindo' AND DescripcionSeccion LIKE '%Vitrina VW ZI Mirolindo%' THEN 'Vitrina JD Agricola ZI Mirolindo'
					WHEN NombreCentro = 'JD-Chia-Mayorista' AND DescripcionSeccion LIKE '%Bodega JD Construcción Carrera 92%' THEN 'Bodega Nacional de Repuestos JD Construcción'
					WHEN NombreCentro = 'JD-Bta-P. Aranda' AND DescripcionSeccion LIKE '%Mesa de repuestos JD Pte Aranda%' THEN 'Mesa de repuestos JD Agrícola Pte Aranda'
					WHEN NombreCentro = 'JD-B/Quilla-Cl.110' AND DescripcionSeccion LIKE '%Mesa de repuestos JD Barranquilla%' THEN 'Mesa de repuestos JD Agricola Barranquilla'
					WHEN NombreCentro = 'JD-B/Quilla-Cl.110' AND DescripcionSeccion LIKE '%Taller Brigada Verde JD Agrícola B/quilla Cll110%' THEN 'Taller JD Agrícola Brigada Verde B/quilla Cll110'
					WHEN NombreCentro = 'JD-B/Quilla-Cl.110' AND DescripcionSeccion LIKE '%Vitrina JD Construccion Cll 110%' THEN 'Vitrina JD Construccion Barranquilla Cll 110'
					WHEN NombreCentro = 'JD-B/Quilla-Cl.110' AND DescripcionSeccion LIKE '%Vitrina Wirtgen Cll110%' THEN 'Vitrina JD Wirtgen Cll110'
					WHEN NombreCentro = 'JD-Cali-Palmira' AND DescripcionSeccion LIKE '%Mesa de repuestos JD Palmira%' THEN 'Mesa de repuestos JD Agrícola Palmira'
					WHEN NombreCentro = 'JD-Cali-Palmira' AND DescripcionSeccion LIKE '%Proyecto Caña Repuestos%' THEN 'Proyecto JD Agrícola Caña Repuestos'
					WHEN NombreCentro = 'JD-Cali-Palmira' AND DescripcionSeccion LIKE '%Proyecto Caña Taller%' THEN 'Proyecto JD Agr Caña Taller'
					WHEN NombreCentro = 'JD-Cali-Palmira' AND DescripcionSeccion LIKE '%Proyecto JD Caña Taller%' THEN 'Proyecto JD Agr Caña Taller'
					WHEN NombreCentro = 'JD-Cali-Palmira' AND DescripcionSeccion LIKE '%Taller Mecánica JD Agrícola Anillo Vial 1%' THEN 'Taller Mecánica JD Agrícola Palmira'
					WHEN NombreCentro = 'JD-Cali-Palmira' AND DescripcionSeccion LIKE '%Taller Móvil Wirtgen  Palmira%' THEN 'Taller Móvil Wirtgen Palmira'
					ELSE DescripcionSeccion END
		FROM (
			SELECT	DISTINCT				Ano_Periodo,				Mes_Periodo,		FechaDeCorte,		IdEmpresas, 
					IdTerceros,				NombreTercero,				DiaDesde,			DiaHasta,			ImporteEfecto,				
					Factura,				NumDet,						AñoAsiento,			IdAsientos,			FechaVencimiento,
					DescripcionSeccion = REPLACE(DescripcionSeccion,'Yumbo','Palmira'),		
					CASE WHEN NombreCentro LIKE '%JD-Cali-Yumbo%' THEN 'JD-Cali-Palmira'
							WHEN NombreCentro LIKE '%VO-Bta-Cra 50%' THEN 'VO-Bta.-bellpi Usados'
							WHEN NombreCentro LIKE '%BYD Bogotá Av. 68%' THEN 'BYD-Bogotá Av. 68'
							WHEN NombreCentro LIKE '%JD-P.Gaitan-Alto Neblinas%' THEN 'JD-Ruta 40'
							WHEN NombreCentro LIKE '%MIT-Bta-Cll 170%' THEN 'MIT-Bta-Vitrina itinerante sabana'
							WHEN NombreCentro LIKE '%BN-Bta-Usados Sausalito%' THEN 'BN-Bta-Sausalito Taller Independiente'
							WHEN NombreCentro LIKE '%DAI.V Btá-Calle 72%' THEN 'DAI.V-Btá-Calle 72'
							WHEN NombreCentro LIKE '%Tramites 6A%' THEN 'Centro Tramites 6A'
							WHEN DescripcionSeccion = 'Taller Móvil JD Wirtgen Itaguí Carrera 92' THEN 'JD-Itagui-Cra 92'
							WHEN IdEmpresas = 6 AND NombreCentro LIKE 'VO-Bta%' AND NombreCentro LIKE '%68%' THEN 'VO-Bta-AV 68'
							WHEN IdEmpresas IN (1, 5) AND NombreCentro LIKE 'VO-Bta%' AND NombreCentro LIKE '%68%' THEN 'VO-Bta-Av.68'				
							ELSE REPLACE(REPLACE(REPLACE(NombreCentro,' ','<>'),'><',''),'<>',' ') END NombreCentro
			FROM [PSCService_DB].[dbo].[spiga_Cartera]
			WHERE (Ano_Periodo >= 2021 AND NombreCentro NOT LIKE '%JD-%') OR (Ano_Periodo >= 2021 AND NombreCentro LIKE '%JD-%' AND DescripcionSeccion IS NOT NULL)
		) A
	)A
	LEFT JOIN (
		SELECT DISTINCT Id_Centro, Centro, Id_Linea 
		FROM [DBMLC_0190].[dbo].[v_CF_AgrupacionLinea]
	) B ON A.NombreCentro = B.Centro 

	LEFT JOIN (
		SELECT DISTINCT Id_Centro, Centro, Seccion, Id_Linea 
		FROM [DBMLC_0190].[dbo].[v_CF_AgrupacionLinea]
	) C ON A.NombreCentro = C.Centro AND A.DescripcionSeccion = C.Seccion
) A
LEFT JOIN (
	SELECT DISTINCT Id_Linea, Linea 
	FROM [DBMLC_0190].[dbo].[v_CF_AgrupacionLinea]
) B ON A.Sigla = B.Id_Linea 

```
