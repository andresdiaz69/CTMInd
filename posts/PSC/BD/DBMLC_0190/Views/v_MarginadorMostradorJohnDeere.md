# View: v_MarginadorMostradorJohnDeere

## Usa los objetos:
- [[Marginador_equivalencias_clasificacion]]
- [[vw_Marginador_Mostrador_data_JohnDeere]]

```sql
CREATE view [dbo].[v_MarginadorMostradorJohnDeere] as --16.480
select distinct Año, Mes, CodigoEmpresa,CodigoCentro,Centro,marca MarcaRepuesto,
       CodMarcaNuevo = case when TipoVenta = 'Agrícola' then convert(varchar,'410')
				       when TipoVenta = 'Construcción' then convert(varchar,'411')
				       when TipoVenta = 'Wirtgen' then convert(varchar,'520')
			           else TipoVenta end,
       MarcaNueva= TipoVenta,     --,valor
	   CodigoSeccion CodigoSeccionFactura,Seccion NombreSeccionFactura,
	   CodigoSeccionNuevo =case when eq.marca_clasificacion is null then CodigoSeccion			                     
								 else eq.cod_seccion_nuevo end,
	   NombreSeccionNuevo =case when eq.marca_clasificacion is null then Seccion			                     
								 else eq.nombre_seccion_nuevo end,
	   
       NumeroFactura,   descripcionpedidotipoventas, FechaFactura
	   --marca_clasificacion marca_Reclasificacion
	   --nombre_seccion_nuevo = case when seccion_com >0 then (select eq.nombre_seccion_nuevo
			 --                                                  from Marginador_equivalencias_clasificacion eq  
				--											  where eq.cod_seccion_nuevo = seccion_com
				--											    and eq.cod_centro_spiga  =CodigoCentro
				--												and eq.cod_seccion_spiga = CodigoSeccion)
				--				  else seccion end
  from (select Orden=ROW_NUMBER() over(partition by NumeroFactura order by valor desc), 
		       año, mes, CodigoEmpresa, marca, descripcionpedidotipoventas,CodigoSeccion,seccion,CodigoCentro,centro,
		       TipoVenta=case when seccion like '%Boutique JD Agrícola%' then 'Agrícola'
						      when descripcionpedidotipoventas = 'Ventas Wirtgen' then 'Wirtgen'
							  when descripcionpedidotipoventas = 'Ventas Construcción' then 'Construcción'						     
						      when descripcionpedidotipoventas = 'Ventas Agrícola' then 'Agrícola'
							  when CodigoCentro = 26 and descripcionpedidotipoventas is null  then case when seccion like '%constr%' then 'Construcción'
							                                                                            else  'Wirtgen' end
							  else 'Agrícola'
						      end,
			   NumeroFactura,              Valor		, b.FechaFactura	   
	 	  from vw_Marginador_Mostrador_data_JohnDeere   b		
			-- where numerofactura ='RIB/119/2023'
    )c
 left join Marginador_equivalencias_clasificacion eq  on eq.cod_centro_spiga  = c.CodigoCentro
		                                             and eq.cod_seccion_spiga = c.CodigoSeccion
													 and eq.marca_clasificacion = c.TipoVenta
 where orden = 1
 --and NumeroFactura = 'CRE/12251/2023' --10:03  -- 3.989 --6:39 -- 3.996 --5:28
  --and año=2024
  --and mes =1 --6.450

 
```
