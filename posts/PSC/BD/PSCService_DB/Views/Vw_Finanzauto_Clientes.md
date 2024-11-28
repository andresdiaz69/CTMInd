# View: Vw_Finanzauto_Clientes

## Usa los objetos:
- [[ComisionesSpigaAlmacenAlbaran]]
- [[ComisionesSpigaTallerPorOT]]
- [[ComisionesSpigaVN]]
- [[ComisionesSpigaVO]]
- [[Empresas]]
- [[spiga_DatosTerceros]]
- [[spiga_Terceros]]
- [[spiga_TerceroTerceroTipos]]
- [[v_habeas_data]]
- [[vw_Terceros_Consolidado]]

```sql
CREATE view Vw_Finanzauto_Clientes as

--MS:050424 -se agrego un case para validar la fecha de modificacion 
--MS:160524 -se agrgeo validacion en la fecha de vinculo cuando este nula se cambia por la misma validaicon de la fecha_alta
--MS:170524 -dejar a fecha de alta aparate.  crear nueva columna de fecha de modificcion.  el servicio web debe ir por la  fechamod
--MS:170524 -se reviso que ninguna fecha quede nula
--MS:290524 -cuando la fecha de vinculo  sea nula, dejar la fecha_alta
select distinct tt.PkFkEmpresas,ee.NombreEmpresa, t.FechaAlta Fecha_Alta,t.fechamod,--case when t.FechaAlta <> t.fechamod and t.FechaAlta < t.fechamod then t.fechamod else t.FechaAlta end
       t.NifCif Numero_identificacion,t.fkdocumentaciontipos TipoIdentificacion , 
       DescrpcionTipoIdentificacion=case t.FkDocumentacionTipos when 1 then 'NIT' 
		                                       when 2 then 'CEDULA'
		   								       when 3 then 'Tarjeta Extranjería'
		   								       when 4 then 'Pasaporte'
		   								       when 5 then 'RUT'
		   								       when 6 then 'Tarjeta Identidad'
		   								       when 7 then 'Cédula de Extranjería'end, 
	    isnull(t.Nombre,'')+' '+ isnull(t.Apellido1,'')+' ' +isnull(t.Apellido2,'') Nombre,
      -- cliente =case when fecha is null  then 'No Vigente'
	               --  else 'Vigente' end,
		tc.TelPrincipal, tc.Celular1, tc.Email_principal, tc.Direccion_Principal, t.EmpresaTrabajo, t.NumeroEmpleados,
		t.AñoConstitucion,t.TipoContribuyente,t.LicenciaConducir_LugarExpedicion,tc.FkEstadoCivilTipos, 
		case when tc.FkEstadoCivilTipos ='S' then 'Soltero/a'
		     when tc.FkEstadoCivilTipos ='C' then 'Casado/a'
			 when tc.FkEstadoCivilTipos ='P' then 'Pareja de Hecho'
			 when tc.FkEstadoCivilTipos ='SE' then 'Separado/a'
			 when tc.FkEstadoCivilTipos ='V' then 'Viudo/a'
			 when tc.FkEstadoCivilTipos ='DE' then 'Desconocido/a'
			 when tc.FkEstadoCivilTipos ='D' then 'Divorciado/a'
			 else 'NA' end Estado_civil,
		tc.Sexo, case when tc.Sexo = 'H' then 'Hombre'
		              when tc.Sexo = 'M' then 'MUjer'
					  else 'Infdefinido' end Descripcion_sexo,
	    tc.PkTerceroFormacionNiveles_Iden, tc.nivel, tc.FkTerceroCargos, tc.cargo,tc.FkActividadTipos, dt.DescripcionActividadTipos,
		tc.NumeroHijos,tc.ciudadPrincipal,tc.FechaNacimiento,
	    isnull(fecha, t.FechaAlta)FechaVinculo,
	    case when ValorBool = 1 then 'No Contactar'
	        else 'contactar' end Habeas 
  from [PSCService_DB]..spiga_Terceros t
  left join [DBMLC_0190]..vw_Terceros_Consolidado tc on t.PkTerceros = tc.PkTerceros    
  join [PSCService_DB].[dbo].spiga_TerceroTerceroTipos tt on tt.PkFkterceros = t.PkTerceros
	                                                     and PkFktercerotipos ='CLTE'
  left join [PSCService_DB].[dbo].spiga_DatosTerceros dt on dt.pkterceros = tc.PkTerceros
                                  and dt.PkFkEmpresas = tt.PkFkempresas
  join [DBMLC_0190]..Empresas  ee on ee.CodigoEmpresa = tt.PkFkempresas													 
  left join (select nit,CodigoEmpresa, min(fecha) fecha
               from (select ta.NitCliente nit,min(fechaentrega) fecha,ta.codigoEmpresa, sum(ValorNeto) valor
                       from [DBMLC_0190]..ComisionesSpigaTallerPorOT  ta 
                      where ta.fechaentrega is not null
			        --    and year(ta.fechaentrega) >=2020
				       -- and codigoEmpresa = 1
				        --and NitCliente = '60123570'
			          group by NitCliente,codigoEmpresa  ---dejar solo         la fecha en taller
			          union all

                     select distinct ta.NitCliente nit, min(FechaFactura) fecha,ta.codigoEmpresa, sum(ValorNeto) valor
                       from [DBMLC_0190]..ComisionesSpigaAlmacenAlbaran  ta 
                      where ta.fechafactura is not null
			          --  and year(ta.fechafactura) >=2020
			        	--and codigoEmpresa =  1
			        	--and NitCliente = '60123570'
			          group by FechaFactura,NitCliente,codigoEmpresa
			  
			          union all
			        
			         select distinct ta.Nit nit,min(FechaEntregaCliente) fecha,ta.codigoEmpresa, sum(EntregaEfectiva) valor
                       from [DBMLC_0190]..ComisionesSpigaVN  ta 
                      where ta.fechaentregacliente is not null
			          --  and year(ta.fechaentregacliente) >=2020
			        	--and codigoEmpresa = 1
			        	--and Nit = '60123570'
			          group by FechaEntregaCliente, nit,codigoEmpresa
			        
			          union all
			        
			         select distinct ta.nit nit, min(FechaEntregaCliente)  fecha ,ta.codigoEmpresa, sum(EntregaEfectiva) valor 
                       from [DBMLC_0190]..ComisionesSpigaVO  ta 
                      where ta.fechaentregacliente is not null
			         --   and year(ta.fechaentregacliente) >=2020
			        --	and codigoEmpresa = 1
			        	--and Nit = '60123570'
			          group by FechaEntregaCliente, nit,codigoEmpresa
			       ) c
			   where valor >0
			   group by nit,CodigoEmpresa
	  ) cm on t.NifCif = cm.nit		
	      and cm.CodigoEmpresa = tt.PkFkempresas
		 -- and year(cm.fechaentrega) = year(t.FechaAlta)
 left join [DBMLC_0190]..v_habeas_data	v	on	t.pkterceros = v.Pkterceros

where t.fechabaja is null
and tt.PkFkempresas in (1,5,6,24)
--and year(t.FechaAlta) >=2020 
--and t.NifCif  ='1000249338'
-- --91.744


```
