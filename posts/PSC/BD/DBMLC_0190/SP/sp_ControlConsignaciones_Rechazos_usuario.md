# Stored Procedure: sp_ControlConsignaciones_Rechazos_usuario

## Usa los objetos:
- [[AspNetUsers]]
- [[ConsignacionesDetalles]]
- [[ConsignacionesEstados]]
- [[v_EmpleadosActivosRetirados]]
- [[VehiculosMarcas]]

```sql

CREATE  PROCEDURE [dbo].[sp_ControlConsignaciones_Rechazos_usuario]  
(
	@FechaIni	datetime,
	@FechaFin	datetime	
) as
--declare @FechaIni	datetime
--@FechaFin	datetime
--set @FechaIni =	'20190701'
--set @FechaFin =	'20190715'

begin 
SELECT Empresa,Marca,Nombres,RechazoUsuario
FROM
(
	SELECT Empresa,Marca,Nombres, RechazoUsuario = CASE WHEN CAST(TotalSolicitudes as float) <> 0 THEN 
		CONVERT(decimal (18,2),(CAST(TotalRechazos as float) / CAST(TotalSolicitudes as float)) * 100,2) ELSE 0 END
	FROM
	(
		SELECT Empresa,Marca,NOMBRES,TotalRechazos=SUM(totalrechazos),TotalSolicitudes=SUM(TotalSolicitudes)
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
							WHEN LTRIM(RTRIM(UPPER(marca))) LIKE '%DIGITAL%' THEN 'Centro Digital'
							WHEN marca IS NULL THEN 'Sin Marca' ELSE marca END, FechaCreacion=CONVERT(date,FechaCreacion), TotalSolicitudes,
				TotalRechazos = CASE WHEN IdConsignacionEstado = 3 THEN COUNT(TotalSolicitudes) ELSE 0 END, nombres
			FROM
			(
				SELECT pkfkempresas,FechaCreacion,TotalSolicitudes = COUNT(IdConsignacion),
					Marca=CASE WHEN Factura_a_Aplicar = 'Adelanto' THEN marca ELSE Marca_factura END,
					IdConsignacionEstado,nombres
				FROM
				(
					SELECT d.Factura_a_Aplicar,d.CodigoMarca,g.Marca,Marca_factura=d.marca,d.PkFkEmpresas,d.FechaCreacion,d.IdConsignacionEstado,
						e.ConsignacionEstado,d.IdConsignacion,d.UserId,u.UserName,nombres = r.nombres + ' ' + r.Apellido1 + ' ' + r.Apellido2
					FROM		ConsignacionesDetalles		d
					LEFT JOIN	VehiculosMarcas				g	ON	d.CodigoMarca = g.CodigoMarca AND d.Factura_a_Aplicar = 'adelanto'
					LEFT JOIN	ConsignacionesEstados		e	ON	e.IdConsignacionEstado = d.IdConsignacionEstado
					LEFT JOIN	AspNetUsers					u	ON	u.id = d.UserId
					LEFT JOIN	v_EmpleadosActivosRetirados	r	ON	u.UserName = r.CodigoEmpleado AND r.Ano_Periodo = YEAR(GETDATE())
																	AND r.Mes_Periodo = MONTH(GETDATE())
				) a 
				GROUP BY pkfkempresas,FechaCreacion,marca,Marca_factura,IdConsignacionEstado,Factura_a_Aplicar,nombres
			)b 
			WHERE FechaCreacion >= @FechaIni AND FechaCreacion <= @FechaFin 
			GROUP BY PkFkEmpresas,Marca,FechaCreacion,IdConsignacionEstado,TotalSolicitudes,nombres
		)c 
		GROUP BY Empresa,Marca,nombres
	)d 
) e 
WHERE RechazoUsuario <> 0	
END

```
