# View: v_marginadorReclasificacion_JohnDeere

## Usa los objetos:
- [[v_MarginadorContabilidad_JohnDeere]]
- [[v_MarginadorVentas_JohnDeere]]

```sql


CREATE view [dbo].[v_marginadorReclasificacion_JohnDeere] as
select año,mes,IdEmpresas,cuenta,CodigoConcepto,NombreConcepto,centro,NombreCentro,seccion,NombreSeccion,
Departamento,NombreDepartamento,factura,CodMarcaVentas,NombreMarcaVentas,
--CodMarcaVentas = case when CodMarcaVentas is null 
--							then case	when NombreSeccion like '%constr%' then 411
--										when NombreSeccion like '%agr%' then 410
--										when NombreSeccion like '%wirtge%' then 520
--										when NombreSeccion like '%tránsito%' then 410
--							end
--						else CodMarcaVentas
--						end,
--NombreMarcaVentas = case when NombreMarcaVentas is null 
--							then case	when NombreSeccion like '%constr%' then 'Construcción'
--										when NombreSeccion like '%agr%' then 'Agrícola'
--										when NombreSeccion like '%wirtge%' then 'Wirtgen'
--										when NombreSeccion like '%tránsito%' then 'Agrícola'
--							end
--						else NombreMarcaVentas
--						end,
valor,FechaFactura
from(
		select c.año,c.mes,c.idempresas,c.cuenta,c.CodigoConcepto,NombreConcepto=rtrim(ltrim(c.NombreConcepto)),c.centro,c.nombrecentro,
		c.seccion,c.nombreseccion,c.departamento,c.NombreDepartamento,
		c.factura,CodMarcaVentas=v.CodMarca,NombreMarcaVentas=v.marca,Valor=c.saldo,FechaFactura
		from		v_MarginadorContabilidad_JohnDeere			c
		left join	v_MarginadorVentas_JohnDeere				v	on	c.año=v.año and c.mes=v.mes
																		and c.idempresas =v.idempresas
																		and c.factura = v.numerofactura
		where c.centro <> 146 
		and (c.Cuenta LIKE '41%' or c.cuenta like '61%')
		--and c.año= 2022
		--and c.mes=1
		--and NumeroFactura like '%R022%'
		--and NumeroFactura like '%100813%'

		UNION ALL

		select c.año,c.mes,c.idempresas,c.cuenta,c.CodigoConcepto,NombreConcepto=rtrim(ltrim(c.NombreConcepto)),c.centro,c.nombrecentro,
		c.seccion,c.nombreseccion,c.departamento,c.NombreDepartamento,
		c.factura,CodMarcaVentas=v.CodMarca,NombreMarcaVentas=v.marca,Valor=c.saldo,FechaFactura
		from		v_MarginadorContabilidad_JohnDeere			c
		left join	v_MarginadorVentas_JohnDeere				v	on	c.año=v.año and c.mes=v.mes
																		and c.idempresas =v.idempresas
																		and c.factura = v.numerofactura
		where c.centro =  146 
		and c.nombreseccion like '%JD%'
		and (c.Cuenta LIKE '41%' or c.cuenta like '61%')
		--and c.año= 2022
		--and c.mes=1
		--and NumeroFactura like '%R022%'
		--and NumeroFactura like '%100813%'
)a
--where factura = '103356'

```
