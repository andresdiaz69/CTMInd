# Stored Procedure: sp_ControlConsignaciones_Rechazos

## Usa los objetos:
- [[ConsignacionesDetalles]]
- [[ConsignacionesEstados]]
- [[VehiculosMarcas]]

```sql

CREATE  PROCEDURE [dbo].[sp_ControlConsignaciones_Rechazos]  
(
	@FechaIni	datetime,
	@FechaFin	datetime	
) as
--@FechaIni	datetime,
--@FechaFin	datetime
--set @FechaIni =	'20190701'
--set @FechaFin =	'20190719'

begin 
SELECT Empresa,Marca,Rechazos = CASE WHEN  CAST(Totalsolicitudes as float) <> 0 THEN 
	CONVERT(decimal(18,2),(CAST (TotalRechazos as float)/CAST(Totalsolicitudes as float))*100,0)
	ELSE 0 END
FROM
(
	SELECT Empresa,Marca,TotalRechazos=SUM(totalrechazos),TotalSolicitudes=SUM(TotalSolicitudes)
	FROM
	(
		SELECT Empresa=PkFkEmpresas,
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
						WHEN marca IS NULL THEN 'Sin Marca'
						WHEN LTRIM(RTRIM(UPPER(marca))) LIKE '%WIRTGEN%' THEN 'Wirtgen' ELSE marca END, FechaCreacion=CONVERT(date,FechaCreacion),
			TotalSolicitudes,TotalRechazos = CASE WHEN IdConsignacionEstado = 3 THEN count(TotalSolicitudes) ELSE 0 END
		FROM
		(
			SELECT pkfkempresas,FechaCreacion,TotalSolicitudes = count(IdConsignacion),
				Marca=CASE WHEN Factura_a_Aplicar = 'Adelanto' THEN marca ELSE Marca_factura END,IdConsignacionEstado
			FROM
			(
				SELECT d.Factura_a_Aplicar,d.CodigoMarca,g.Marca,Marca_factura=d.marca,d.PkFkEmpresas,d.FechaCreacion,d.IdConsignacionEstado,
					e.ConsignacionEstado,d.IdConsignacion
				FROM		ConsignacionesDetalles	d
				LEFT JOIN	VehiculosMarcas			g	on	d.CodigoMarca = g.CodigoMarca AND d.Factura_a_Aplicar = 'adelanto'
				LEFT JOIN	ConsignacionesEstados	e	on	e.IdConsignacionEstado = d.IdConsignacionEstado
			) a 
			GROUP BY pkfkempresas,FechaCreacion,marca,Marca_factura,IdConsignacionEstado,Factura_a_Aplicar
		)b 
		WHERE FechaCreacion >= @FechaIni AND FechaCreacion <= @FechaFin 
		GROUP BY PkFkEmpresas,Marca,FechaCreacion,IdConsignacionEstado,TotalSolicitudes
	)c 
	GROUP BY Empresa,Marca
)d
END

```
