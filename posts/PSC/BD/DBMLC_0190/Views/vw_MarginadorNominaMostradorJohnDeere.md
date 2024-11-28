# View: vw_MarginadorNominaMostradorJohnDeere

## Usa los objetos:
- [[Marginador_equivalencias_clasificacion]]
- [[spiga_ConsultaMovimientosReferencia]]
- [[UnidadDeNegocio]]
- [[v_Marginador_TipoVentasJohnDeere]]

```sql
CREATE view [dbo].[vw_MarginadorNominaMostradorJohnDeere] as
select distinct año, mes, CodigoEmpresa,CodigoCentro,centro,
       CodigoSeccion =case when eq.marca_clasificacion is null then CodigoSeccion			                     
								 else eq.cod_seccion_nuevo end,
	   seccion =case when eq.marca_clasificacion is null then Seccion			                     
								 else eq.nombre_seccion_nuevo end,

       CodMarca = case when TipoVenta = 'Agrícola' then convert(varchar,'410')
				       when TipoVenta = 'Construcción' then convert(varchar,'411')
				       when TipoVenta = 'Wirtgen' then convert(varchar,'520')
			           else TipoVenta end,
       marca= TipoVenta,NumeroFactura, descripcionpedidotipoventas,  sum(valor) valor
  from (select --Orden=ROW_NUMBER() over(partition by NumeroFactura order by valor desc), 
		       año, mes, CodigoEmpresa, marca, descripcionpedidotipoventas, CodigoCentro,centro,CodigoSeccion,seccion,
		      TipoVenta=case when seccion like '%Boutique JD Agrícola%' then 'Agrícola'
						      when descripcionpedidotipoventas = 'Ventas Wirtgen' then 'Wirtgen'
							  when descripcionpedidotipoventas = 'Ventas Construcción' then 'Construcción'						     
						      when descripcionpedidotipoventas = 'Ventas Agrícola' then 'Agrícola'
							  when CodigoCentro = 26 and descripcionpedidotipoventas is null  then case when seccion like '%constr%' then 'Construcción'
							                                                                            else  'Wirtgen' end
							  else 'Agrícola'
						      end,
			  NumeroFactura,              Valor+Portes valor
		 from (select año=year(FechaFactura),      mes=month(FechaFactura),     IdEmpresas codigoempresa,       IdCentros CodigoCentro , 
		              NombreCentro centro,		   IdSecciones CodigoSeccion,   NombreSeccion seccion,          IdMR marca,         
					  descripcionpedidotipoventas, NumeroFactura,               Valor=sum(Valor) ,              Portes					  
         		 from (select a.Ano_Periodo,  a.Mes_Periodo,          a.IdEmpresas, --u.,
                        	   a.IdCentros,          u.NombreCentro,             a.IdSecciones, u.NombreSeccion,
                        	   a.FechaFactura,			NumeroFactura = SerieFactura+'/'+Factura+'/'+AñoFactura,
                        	   IdMR,a.IdReferencias,      a.IdMovimientoTipos,            m.descripcionpedidotipoventas,
                        	   (Precio*Unidades)-(precio*Unidades)*DtoPorc valor,Portes                
                          from [PSCService_DB].dbo.spiga_ConsultaMovimientosReferencia		a
                          left join UnidadDeNegocio      u  on  u.CodEmpresa = a.IdEmpresas
                                                           and  u.CodCentro  = a.IdCentros
                        								   and  u.CodSeccion = a.IdSecciones
                          left join	[DBMLC_0190].dbo.v_Marginador_TipoVentasJohnDeere  m on a.IdEmpresas=m.IdEmpresas	
																	                    and a.IdCentros = m.IdCentros
																	                    and a.IdSecciones = m.IdSecciones
																	                    and (SerieFactura+'\'+Factura+'\'+AñoFactura) = m.numerofactura
																	                    and a.IdReferencias = m.IdReferencias	
																	                    and a.IdMovimientoTipos = m.IdMovimientoTipos
						where a.IdMovimientoTipos in('VCO', 'VCOA', 'VCR', 'VCRA', 'VIN' , 'VINA')) a
						where a.NombreCentro like '%JD-%'
						--and a.CodigoCentro = 124
						--and a.NumeroFactura like '%R044%' --R044/108834/2023
						--and a.NumeroFactura like '%108834%'
						 -- and a.TipoMov  in ('VTA','VTAA')			
				       group by year(FechaFactura),       month(FechaFactura), IdEmpresas,     IdCentros,
					            NombreCentro,   			         IdSecciones,       NombreSeccion,           IdMR,
								descripcionpedidotipoventas, NumeroFactura,      portes								
				
		     )b
    )c
	left join Marginador_equivalencias_clasificacion eq on eq.cod_centro_spiga  = c.CodigoCentro
		                                               and eq.cod_seccion_spiga = c.CodigoSeccion
													   and eq.marca_clasificacion = c.TipoVenta
	--where año=2023
--  NumeroFactura = 'R025/105324/2023' and--10:03  -- 3.989 --6:39 -- 3.996 --5:28
 --  
 -- and mes=6 --3.989
--  and Valor >0
  --and seccion like '%for%'
  group by año, mes, CodigoEmpresa,CodigoCentro,centro,CodigoSeccion,cod_seccion_nuevo,seccion,
  nombre_seccion_nuevo,marca_clasificacion,TipoVenta,NumeroFactura, descripcionpedidotipoventas



```
