# View: v_BaseDatos_FinandinaTaller

## Usa los objetos:
- [[ComisionesSpigaTallerPorOT]]
- [[vw_Terceros_Consolidado]]
- [[vw_VehiculosDatosModelo]]

```sql

CREATE  view [dbo].[v_BaseDatos_FinandinaTaller] as 
--MS: 060923 -- se remplaza la tabla de terceros LlamadaAgendamientoDatosTerceroFechaAlta por la vista vw_Terceros_Consolidado y se quito el group by

select distinct empresa,            Nit = NitCliente,
       nombreTercero=NombreCliente, t.celular1 Celular,
	   t.TelPrincipal Telefono,
	   email_principal Email,       NombreMarca,
	   FechaFactura,                NombreGama,
	   AñoModelo,                   DescripcionTrabajo
 from (select distinct empresa, centro,     FechaFactura,
              NombreMarca,      NitCliente, NombreCliente,
			  NombreGama,       AñoModelo,  DescripcionTrabajo
	     from (select distinct año=year(ve.FechaFactura), mes=month(ve.FechaFactura),
					  ve.Empresa,                         ve.Centro,
					  ve.FechaFactura,                    ve.NombreMarca,
					  ve.NitCliente,                      ve.NombreCliente,
			          ve.NombreGama,                      AñoModelo = convert(varchar,m.AñoModelo),
					  DescripcionTrabajo=max(ve.DescripcionTrabajo)
			     from ComisionesSpigaTallerPorOT	ve
			     left join vw_VehiculosDatosModelo	m	on ve.VIN = m.vin
													   and convert(varchar,m.CodigoGama) = convert(varchar,ve.Gama)
													   and convert(varchar,ve.marcaveh)  = convert(varchar,m.CodigoMarca)
													   and ve.Placa                      = m.placa 
			    where ve.NitCliente not in ('8300049938','860019063','8600190638')
			    group by year(ve.FechaFactura),  month(ve.FechaFactura),
				         ve.Empresa,ve.Centro,   ve.FechaFactura,
						 ve.NombreMarca,         ve.NitCliente,
						 ve.NombreCliente,       ve.NombreGama,convert(varchar,m.AñoModelo)
			  )a 
      )b 
 left join vw_terceros_consolidado		  t	on b.NitCliente      = t.Nifcif

where empresa <> '24'						
and year(FechaFactura) >= 2023 --and FechaFactura <= '20200317'

```
