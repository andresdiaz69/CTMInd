# View: v_MarginadorMostradorJohnDeere1Ago2023

## Usa los objetos:
- [[ComisionesSpigaAlmacenAlbaran]]
- [[v_Marginador_TipoVentasJohnDeere]]

```sql
CREATE view [dbo].[v_MarginadorMostradorJohnDeere] as
select distinct año, mes, CodigoEmpresa,--CodigoCentro,centro,CodigoSeccion,seccion,
       CodMarca = case when TipoVenta = 'Agrícola' then convert(varchar,'410')
				       when TipoVenta = 'Construcción' then convert(varchar,'411')
				       when TipoVenta = 'Wirtgen' then convert(varchar,'520')
			           else TipoVenta end,
       marca= TipoVenta,NumeroFactura--,valor
  from (select Orden=ROW_NUMBER() over(partition by NumeroFactura order by valor desc), 
		       año, mes, CodigoEmpresa, marca,--CodigoCentro,centro,CodigoSeccion,seccion,
		      TipoVenta=case when descripcionpedidotipoventas = 'Ventas Wirtgen' then 'Wirtgen'
						     when descripcionpedidotipoventas = 'Ventas Construcción' then 'Construcción'
						     when descripcionpedidotipoventas in ('Maquina Inmovilizada','Pedido Stock','Pedido Urgente',
															      'Ventas B2B','Ventas Proyecto Caña') then 'Agrícola'
						     when descripcionpedidotipoventas is null and marca = 'JOH' and Seccion like '%Agrícola%' then 'Agrícola'
						     when descripcionpedidotipoventas is null and marca = 'OTR' and Seccion like '%Agrícola%' then 'Agrícola'
						     when descripcionpedidotipoventas is null and marca = 'JOH' and seccion like '%construcc%' then 'Construcción'
						     when descripcionpedidotipoventas is null and marca = 'OTR' and seccion like '%construcc%' then 'Construcción'
						     when descripcionpedidotipoventas is null and marca not in  ('JOH','OTR') then 'Wirtgen'
						     when descripcionpedidotipoventas = 'Ventas Agrícola' then 'Agrícola'
						     else Clasificacion5Mov
						     end,
			  NumeroFactura,              Valor
		 from (select año=year(FechaFactura),      mes=month(FechaFactura), CodigoEmpresa,        CodigoCentro, 
		              centro,			           CodigoSeccion,           seccion,              marca,         
					  descripcionpedidotipoventas, NumeroFactura,           Valor=sum(ValorNeto), Clasificacion5Mov
				 from (select  distinct a.Ano_Periodo,  a.Mes_Spiga,  a.CodigoEmpresa,  a.Empresa,
				               a.CodigoCentro,          a.Centro,     a.CodigoSeccion,  a.Seccion,
						       a.FechaFactura,			NumeroFactura =replace(a.NumeroFactura,'\','/'),
						       a.Marca,a.Referencia,    a.TipoMov,    m.descripcionpedidotipoventas,
							   ValorNeto,               a.Clasificacion5Mov
						 from [DBMLC_0190].dbo.ComisionesSpigaAlmacenAlbaran		a
						 left join	[DBMLC_0190].dbo.v_Marginador_TipoVentasJohnDeere m	on a.CodigoEmpresa=m.IdEmpresas	
																				       and a.CodigoCentro = m.IdCentros
																				       and a.CodigoSeccion = m.IdSecciones
																				       and a.NumeroFactura = m.numerofactura
																				       --and a.Referencia = m.IdReferencias	
																				       and a.TipoMov = m.IdMovimientoTipos
						where a.centro like '%JD-%'
						--and a.CodigoCentro = 124
						--and a.NumeroFactura like '%R065%'
						--and a.NumeroFactura like '%101527%'
						--and a.Ano_Periodo = 2022
						--and a.Mes_Periodo = 9
						
				       )a group by year(FechaFactura),       month(FechaFactura), CodigoEmpresa,    CodigoCentro,
					            centro,   			         CodigoSeccion,       seccion,          marca,
								descripcionpedidotipoventas, NumeroFactura,       Clasificacion5Mov

				 union all

				select año=year(FechaFactura),      mes=month(FechaFactura),  CodigoEmpresa,        CodigoCentro,
				       centro, 				        CodigoSeccion,            seccion,              marca, 
					   descripcionpedidotipoventas, NumeroFactura,            Valor=sum(ValorNeto), Clasificacion5Mov
				 from (select a.Ano_Periodo,  a.Mes_Spiga,      a.CodigoEmpresa, a.Empresa,      a.CodigoCentro,
				              a.Centro,       a.CodigoSeccion,  a.Seccion,   	 a.FechaFactura, NumeroFactura=replace(a.NumeroFactura,'\','/'),
						      a.Marca,        a.Referencia,     a.TipoMov,       m.descripcionpedidotipoventas,
							  ValorNeto,      a.Clasificacion5Mov
						 from [DBMLC_0190].dbo.ComisionesSpigaAlmacenAlbaran		a
						 left join	[DBMLC_0190].dbo.v_Marginador_TipoVentasJohnDeere	m on a.CodigoEmpresa = m.IdEmpresas	
																				         and a.CodigoCentro  = m.IdCentros
																				         and a.CodigoSeccion = m.IdSecciones
																				         and a.NumeroFactura = m.numerofactura
																				         --and a.Referencia = m.IdReferencias	
																				         and a.TipoMov       = m.IdMovimientoTipos
						where a.CodigoCentro = 146
						  and a.Seccion like '%JD%'
						--and a.Ano_Periodo = 2022
						--and a.Mes_Periodo = 9
						--and a.CodigoCentro = 124
						--and a.NumeroFactura like '%R065%'
						--and a.NumeroFactura like '101527%'
				       ) a group by year(FechaFactura),       month(FechaFactura),  CodigoEmpresa,     CodigoCentro,
					             centro,                      CodigoSeccion,        seccion,           marca,
								 descripcionpedidotipoventas, NumeroFactura,        Clasificacion5Mov
		     )b
    )c where orden = 1
  --and NumeroFactura = 'RI3/414/2023'
  --and año=2022
  --and mes=11

```
