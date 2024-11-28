# Stored Procedure: sp_ControlConsignaciones_PorPeriodo

## Usa los objetos:
- [[ConsignacionesDetalles]]
- [[ConsignacionesEstados]]
- [[VehiculosMarcas]]

```sql

CREATE PROCEDURE [dbo].[sp_ControlConsignaciones_PorPeriodo]  
(
	@FechaIni	datetime,
	@FechaFin	datetime	
) as
--@FechaIni	datetime,
--@FechaFin	datetime
--set @FechaIni =	'20190701'
--set @FechaFin =	'20190705'

begin 

SELECT Empresa, Marca, Tipo, FechaConfirmacion, TotalConfirmaciones = SUM(TotalConfirmaciones), Valor = SUM(Monto)
FROM
(
	SELECT Empresa = PkFkEmpresas,
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
			WHEN LTRIM(RTRIM(UPPER(marca))) LIKE '%WIRTGEN%' THEN 'Wirtgen' ELSE marca END,	FechaConfirmacion = CONVERT(date,ModificoEstado_Fecha),
		TotalSolicitudes, TotalConfirmaciones = CASE WHEN IdConsignacionEstado = 2 THEN count(TotalSolicitudes) ELSE 0 END, Monto,Tipo
	FROM
	(	
		SELECT pkfkempresas, ModificoEstado_Fecha, TotalSolicitudes = count(IdConsignacion),
			Marca = CASE WHEN Factura_a_Aplicar = 'Adelanto' THEN marca ELSE Marca_factura END, IdConsignacionEstado,
			Monto = SUM(monto),Tipo
		FROM
		(
			SELECT d.Factura_a_Aplicar, d.CodigoMarca, g.Marca, Marca_factura = d.marca, d.PkFkEmpresas, d.ModificoEstado_Fecha,
				d.IdConsignacionEstado, e.ConsignacionEstado, d.IdConsignacion, Monto, Tipo
			FROM		ConsignacionesDetalles	d
			LEFT JOIN	VehiculosMarcas			g	ON	d.CodigoMarca = g.CodigoMarca AND d.Factura_a_Aplicar = 'adelanto'
			LEFT JOIN	ConsignacionesEstados	e	ON	e.IdConsignacionEstado = d.IdConsignacionEstado
		) a 
		GROUP BY pkfkempresas, ModificoEstado_Fecha, marca, Marca_factura, IdConsignacionEstado, Factura_a_Aplicar, Tipo
	)b 	
	GROUP BY PkFkEmpresas, Marca, ModificoEstado_Fecha, IdConsignacionEstado, TotalSolicitudes, Monto, Tipo
)c  
WHERE FechaConfirmacion >= @FechaIni AND FechaConfirmacion <= @FechaFin
GROUP BY Empresa, Marca, Tipo, FechaConfirmacion
END		

```
