# View: vw_Terceros_Consolidado

## Usa los objetos:
- [[spiga_TerceroFormacionNiveles]]
- [[spiga_Terceroscargos]]
- [[vw_Terceros_Consolidado_Correos]]
- [[vw_Terceros_Consolidado_Direcciones]]
- [[vw_Terceros_Consolidado_Telefonos]]
- [[vw_Terceros_Registro_Unico]]

```sql





CREATE   view [dbo].[vw_Terceros_Consolidado] as 
--MS: 120923 --se agreocase para el campo de tipodocumento
  select t.PkTerceros,                fkterceroclases,            fktratamientos,			    Nifcif,               
         t.nombre,                    Apellido1,                  Apellido2,				    isnull(t.nombre,'')+' '+ ISNULL(Apellido1,'')+' '+ ISNULL(Apellido2,'') nombre_completo,
		 nombrecomercial,   	      EmpresaTrabajo,             FkProfesiones,                FkTerceroCargos,		             
		 FkTerceroFormacionNiveles,   FechaNacimiento,            NumeroHijos,                  t.Fecha_Alta,	
		 t.FechaBaja, 		          t.UserMod,                  FkDocumentacionTipos,         FkEstadoCivilTipos,	
		 TipoDocumento=case FkDocumentacionTipos when 1 then 'NIT' 
			                                     when 2 then 'CEDULA'
												 when 3 then 'Tarjeta Extranjería'
												 when 4 then 'Pasaporte'
												 when 5 then 'RUT'
												 when 6 then 'Tarjeta Identidad'
												 when 7 then 'Cédula de Extranjería'end,
		 t.FechaMod, 		          Sexo,                       FkActividadTipos,             Robinson ,		
		 FkNaturalezaJuridicaTipos,   TipoContribuyente,          RobinsonAnt,                  FechaModRobinson,	
		 FkCausaBajaTercero, 		  NoTieneEmail,               CentroCoste,                  FkNivelesRiesgo,
		 NifCif_FechaExpedicion,	  NifCif_LugarExpedicion,     tc.TelPrincipal,              tc.ExtPrincipal, 
		 tc.PaisTelprincipal,         tc.telParticular1,          tc.partExt1,			        tc.partPais1, 
		 tc.TelParticular2,           tc.partExt2,			      tc.partPais2,                 tc.celular1,  
		 tc.celExt1,			      tc.celPais1,		          tc.celular2,                  tc.celExt2,         
		 tc.celPais2,                 tc.TelTrabajo1,       	  tc.traExt1,                   tc.traPaises1,   
		 tc.TelTrabajo2,              tc.traExt2,                 tc.traPaises2,  	            cp.email_principal,
		 cp.email_particular1,    	  cp.email_particular2,    	  cp.email_facturacion1,        cp.email_facturacion2,  
		 cp.email_trabajo1,           cp.email_trabajo2,     	  dc.PrincipalPais,             dc.ciudadPrincipal,
		 dc.Direccion_Principal,      dc.casadirPais1,            dc.ciudadCasa1,               dc.Direccion_casa1,
		 dc.casadirPais2,             dc.ciudadCasa2,             dc.Direccion_casa2, 		    dc.ofidirPais1,  
		 dc.ciudadOficina1,           dc.Direccion_oficina1,	  dc.ofidirPais2,               dc.ciudadOficina2, 
		 dc.Direccion_oficina2, 	  dc.otradirPais1,            dc.ciudadOtra1,               dc.Direccion_Otra1, 
         dc.otradirPais2,             dc.ciudadOtra2,             dc.Direccion_Otra2,           c.Descripcion cargo   ,    
		 tn.PkTerceroFormacionNiveles_Iden,	 tn.descripcion nivel
	        
   from [DBMLC_0190].dbo.vw_terceros_registro_unico     (NOLOCK)   t

   left join [DBMLC_0190].dbo.vw_Terceros_Consolidado_Telefonos    (NOLOCK)	 tc on t.PkTerceros = tc.PkTerceros 
	                                                             
   left join [DBMLC_0190].dbo. vw_Terceros_Consolidado_Correos 	   (NOLOCK)  cp on t.PkTerceros = cp.PkTerceros 
	                                                            
   left join [DBMLC_0190].dbo.vw_Terceros_Consolidado_Direcciones  (NOLOCK)	 dc on t.PkTerceros = dc.PkTerceros	                                                       

   left join [PSCService_DB].dbo.spiga_Terceroscargos	  (NOLOCK)     c   on c.PkTerceroCargos_Iden = t.FkTerceroCargos
   left join [PSCService_DB].dbo.spiga_TerceroFormacionNiveles (NOLOCK) tn  on tn.PkTerceroFormacionNiveles_Iden = t.FkTerceroFormacionNiveles
  --where --t.Nifcif not  in ('8300049938','9005736668','9013893271','9002830997','8001585381','9003539391','8600190638')	    
	    --t.Nifcif = '1024570282'--'1024570282'

```
