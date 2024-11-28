# Stored Procedure: sp_ControlConsignaciones_Oportunidad

## Usa los objetos:
- [[ConsignacionesDetalles]]
- [[ConsignacionesEstados]]
- [[rhh_tbcalEND]]
- [[VehiculosMarcas]]

```sql

CREATE  PROCEDURE [dbo].[sp_ControlConsignaciones_Oportunidad]  

(
	@FechaIni	datetime,
	@FechaFin	datetime	
) as
--@FechaIni	datetime,
--@FechaFin	datetime
--set @FechaIni =	'20190701'
--set @FechaFin =	'20190731'

begin 
SELECT Empresa, Marca, Tipo, Oportunidad = CONVERT(decimal(18,2),CASE WHEN SUM(TotalConfirmaciones) <> 0 THEN 
	CASE WHEN dias < DiasNoHabiles THEN (SUM(CAST(dias as float)))/SUM(TotalConfirmaciones) 
	ELSE  (SUM(CAST(dias as float))-diasNoHabiles)/SUM(TotalConfirmaciones) 
	END ELSE 0 END), fechacreacion, fechaconfirmacion,
	TotalConfirmaciones = SUM(TotalConfirmaciones) , dias = SUM(CAST(dias as float)), DiasNoHabiles=max(DiasNoHabiles), UserID
FROM 
(
	SELECT Empresa,
		Marca = CASE WHEN LTRIM(RTRIM(UPPER(marca))) LIKE '%BONAPARTE%' THEN 'Bonaparte' 
					WHEN LTRIM(RTRIM(UPPER(marca))) LIKE '%DAIMLER COMERCIAL%' THEN 'Daimler VC'
					WHEN LTRIM(RTRIM(UPPER(marca))) LIKE '%DAIMLER VE%' THEN 'Daimler PC'
					WHEN LTRIM(RTRIM(UPPER(marca))) LIKE '%DAIMLER PC%' THEN 'Daimler PC'
					WHEN LTRIM(RTRIM(UPPER(marca))) LIKE '%DAIMLER VC%' THEN 'Daimler VC'
					WHEN LTRIM(RTRIM(UPPER(marca))) LIKE '%JOHN DEERE%' THEN 'John Deere'
					WHEN LTRIM(RTRIM(UPPER(marca))) LIKE '%MERCEDES LIGERO%' THEN 'Daimler VC'
					WHEN LTRIM(RTRIM(UPPER(marca))) LIKE '%MERCEDES TRUCK%' THEN 'Daimler VC'
					WHEN LTRIM(RTRIM(UPPER(marca))) LIKE '%MERCEDES VAN%' THEN 'Daimler VC'
					WHEN LTRIM(RTRIM(UPPER(marca))) LIKE '%MERCEDES-BENZ%' THEN 'Daimler PC'
					WHEN LTRIM(RTRIM(UPPER(marca))) LIKE '%MMC%' THEN 'Mitsubishi'
					WHEN LTRIM(RTRIM(UPPER(marca))) LIKE '%FUSO%' THEN 'Daimler VC'
					WHEN LTRIM(RTRIM(UPPER(marca))) LIKE '%VW COMERCIALES%' THEN 'Volkswagen'
					WHEN LTRIM(RTRIM(UPPER(marca))) LIKE '%COLISI%' THEN 'Centro de Colisión'
					WHEN LTRIM(RTRIM(UPPER(marca))) = 'FORD' THEN 'Ford'
					WHEN LTRIM(RTRIM(UPPER(marca))) = 'MAZDA' THEN 'Mazda'
					WHEN LTRIM(RTRIM(UPPER(marca))) = 'RENAULT' THEN 'Renault'
					WHEN LTRIM(RTRIM(UPPER(marca))) = 'USADOS' THEN 'Usados'
					WHEN LTRIM(RTRIM(UPPER(marca))) = 'VOLKSWAGEN' THEN 'Volkswagen'
					WHEN LTRIM(RTRIM(UPPER(marca))) = 'WIRTGEN' THEN 'Wirtgen'
					WHEN LTRIM(RTRIM(UPPER(marca))) LIKE '%BYD%' THEN 'BYD'
					WHEN LTRIM(RTRIM(UPPER(marca))) = 'HAMM' THEN 'Hamm'
					WHEN LTRIM(RTRIM(UPPER(marca))) LIKE '%ISRARIE%' THEN 'Israriego'
					WHEN LTRIM(RTRIM(UPPER(marca))) LIKE '%USC%' THEN 'USC'
					WHEN LTRIM(RTRIM(UPPER(marca))) LIKE '%DYNAPAC%' THEN 'Dynapac'
					WHEN LTRIM(RTRIM(UPPER(marca))) LIKE '%FREIGHTLINER%' THEN 'Freightliner'
					WHEN LTRIM(RTRIM(UPPER(marca))) LIKE '%IMPLEMENT%' THEN 'Implemetos'
					WHEN LTRIM(RTRIM(UPPER(marca))) LIKE '%DIGITAL%' THEN 'Centro Digital'
					WHEN LTRIM(RTRIM(UPPER(marca))) LIKE '%WIRTGEN%' THEN 'Wirtgen' 
					WHEN marca IS NULL THEN 'Sin Marca' ELSE marca END, dias, Tipo, TotalSolicitudes = SUM(TotalSolicitudes), 
					TotalConfirmaciones = SUM(TotalConfirmaciones), FechaCreacion, FechaConfirmacion, UserID,
		DiasNoHabiles=
		(
			SELECT  
				SUM(CASE WHEN F.DiaSemana = 6             THEN F.Cant ELSE 0 END) +
				SUM(CASE WHEN F.DiaSemana = 7             THEN F.Cant ELSE 0 END) +
				(
					SELECT count(dia_fes) FROM [Novasoft_CT_MM].[dbo].rhh_tbcalEND 
					WHERE dia_fes >= FechaCreacion AND dia_fes <= FechaConfirmacion) 
			FROM  
			(
				SELECT  1 AS Diasemana, DATEDIFF(DAY, -7, FechaConfirmacion)/7-DATEDIFF(DAY, -6, FechaCreacion)/7 AS Cant UNION
				SELECT  2 AS Diasemana, DATEDIFF(DAY, -6, FechaConfirmacion)/7-DATEDIFF(DAY, -5, FechaCreacion)/7 AS Cant UNION
				SELECT  3 AS Diasemana, DATEDIFF(DAY, -5, FechaConfirmacion)/7-DATEDIFF(DAY, -4, FechaCreacion)/7 AS Cant UNION
				SELECT  4 AS Diasemana, DATEDIFF(DAY, -4, FechaConfirmacion)/7-DATEDIFF(DAY, -3, FechaCreacion)/7 AS Cant UNION
				SELECT  5 AS Diasemana, DATEDIFF(DAY, -3, FechaConfirmacion)/7-DATEDIFF(DAY, -2, FechaCreacion)/7 AS Cant UNION
				SELECT  6 AS Diasemana, DATEDIFF(DAY, -2, FechaConfirmacion)/7-DATEDIFF(DAY, -1, FechaCreacion)/7 AS Cant UNION
				SELECT  7 AS Diasemana, DATEDIFF(DAY, -1, FechaConfirmacion)/7-DATEDIFF(DAY,  0, FechaCreacion)/7 AS Cant
			) 
		F)
	FROM 
	(
		SELECT Empresa = PkFkEmpresas, Marca = CASE WHEN Factura_a_Aplicar = 'Adelanto' THEN marca ELSE Marca_factura END,
			dias = isnull(datediff(day,FechaCreacion,FechaConfirmacion),datediff(day,FechaCreacion,@FechaIni)), Tipo,
			TotalSolicitudes = count(IdConsignacion), IdConsignacionEstado, FechaConfirmacion, userid,
			TotalConfirmaciones = CASE WHEN IdConsignacionEstado = 2 THEN count(IdConsignacion) ELSE 0 END,FechaCreacion
		FROM
		(
			SELECT d.Factura_a_Aplicar, d.CodigoMarca, g.Marca, Marca_factura = d.marca, d.PkFkEmpresas, FechaCreacion = CONVERT(date,d.FechaCreacion),
				d.IdConsignacionEstado, e.ConsignacionEstado, d.IdConsignacion, FechaConfirmacion = CONVERT(date,d.ModificoEstado_Fecha), Tipo, d.userid
			FROM		ConsignacionesDetalles	d
			LEFT JOIN	VehiculosMarcas			g	ON	d.CodigoMarca = g.CodigoMarca AND d.Factura_a_Aplicar = 'adelanto'
			LEFT JOIN	ConsignacionesEstados	e	ON	e.IdConsignacionEstado = d.IdConsignacionEstado
		) a	
		GROUP BY PkFkEmpresas, Factura_a_Aplicar, marca, Marca_factura, FechaCreacion, FechaConfirmacion, Tipo, IdConsignacionEstado, FechaCreacion, FechaConfirmacion, userid
	)b  
	WHERE FechaConfirmacion >= @FechaIni AND FechaConfirmacion <= @FechaFin
	GROUP BY empresa, marca, dias, Tipo, TotalSolicitudes, IdConsignacionEstado, FechaCreacion, FechaConfirmacion, UserID
)c 
GROUP BY Empresa, Marca, Tipo, DiasNoHabiles, dias, FechaConfirmacion, fechacreacion, UserID
END

```
