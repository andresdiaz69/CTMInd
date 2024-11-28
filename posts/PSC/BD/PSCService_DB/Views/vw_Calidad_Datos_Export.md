# View: vw_Calidad_Datos_Export

## Usa los objetos:
- [[CalidadDeDatos_Export_Reenvio]]
- [[spiga_Empleados]]
- [[spiga_Terceros]]
- [[spiga_TercerosCorreos]]
- [[spiga_TercerosDirecciones]]
- [[spiga_TercerosTelefonos]]
- [[vw_terceros_registro_unico]]

```sql


CREATE VIEW [dbo].[vw_Calidad_Datos_Export] AS
select distinct 
       Id_Proyecto = 1,   
       Ideorg='casatoro',   
       Fte='spiga',   
       Token_user='k6eu84doz0hym7yjeu13mck2tkrfun67quhx412l3u', -- JCS: 2023/08/10 - IMPORTANTE! - TEST
       --Token_user='zWTsJ34qIc638g1bZaz9ArsD1TXdvNEVD9yTOORJfl', -- JCS: 2023/08/10 - IMPORTANTE! - PRODUCCIÓN
       --MS: 260424 - se agrega replace para omitir las comillas en los campos de identificador, nombres, apellidos y razon soacial
	   --MS: 290524 - se cambia en el identificador el nombre o razon social por el PkTerceros y el Nifcif por tanto se retiran los replace
       Identificador_Aleatorio = CONVERT(varchar,year(getdate())) 
							     + case when month(getdate()) < 10 then '0' + CONVERT(varchar,month(getdate())) else CONVERT(varchar,month(getdate())) end 
							     + CONVERT(varchar,day(getdate()))
							     + convert(varchar,rtrim(ltrim(replace(replace(replace(convert(varchar(300),CONVERT (time, SYSDATETIME())) ,':',''),'.',''),'  ','')))) 
							     + convert(varchar,row_number() over(order by t.NifCif asc))
							     + replace(convert(varchar,PkTerceros),' ','')
								 + replace(convert(varchar,Nifcif),' ',''),      
       
	   
	   ContadorIdentificador=1,                
	   ConfPost=1,    
	   ideuser=isnull(convert(varchar(100),t.UserMod),''),
       
	   --JCS:2024/03/20 - AJUSTE SOLICITADO POR JP, AHORA tiptra SIMPRE DEBE SER -> A
	   --tiptra = case when t.Fecha_Alta=t.FechaMod then 'V' else  'A' end,
	   tiptra = 'A',

	   Codter = t.PkTerceros,
       TipDoc= isnull(convert(varchar(100),t.FkDocumentacionTipos),''),
       NumDoc=isnull(convert(varchar(100),t.NifCif),''),
       Nom1 = replace(RTRIM(LTRIM(isnull(case when t.FkDocumentacionTipos = 1 then isnull(replace(t.NombreComercial,'',NULL), 
																						 (convert(varchar(300),t.nombre) 
                                                                                           + ' ' + convert(varchar(300),isnull(t.Apellido1,''))     
                                                                                           + ' ' + convert(varchar(300),isnull(t.apellido2,''))))
	                                  else case when charindex(' ',t.nombre,2) = 0 then t.nombre 
							                    when charindex(' ',t.nombre,2) = 2 then t.nombre
		                                        else substring(t.nombre,1,(charindex(' ',t.nombre,2))) end
		                         end,' '))),'"',''),
       Nom2=  replace(RTRIM(LTRIM(isnull(case when t.FkDocumentacionTipos = 1 then '' 
	                                  else case when charindex(' ',t.nombre,1) = 1 then  ''
		                                        when charindex(' ',t.nombre,2) <> 0 then  substring(t.nombre,(charindex(' ',t.nombre,2)+1),30) 
											    else  '' end
									  end,''))),'"',''),
       --cantidad=charindex(' ',t.nombre,2),
       --Primer_Nombre = case when charindex(' ',t.nombre,2) = 0 then t.nombre else substring(t.nombre,1,(charindex(' ',t.nombre,2))) end,
       --Segundo_Nombre = substring(t.nombre,(charindex(' ',t.nombre,2)+1),20),
       Ape1= replace(LTRIM(RTRIM(isnull(t.Apellido1,'' ))),'"',''),
	   Ape2= replace(LTRIM(RTRIM(isnull(t.Apellido2,'' ))),'"',''),
       RazSoc = replace(LTRIM(RTRIM(case when t.FkDocumentacionTipos = 1 then isnull(t.NombreComercial, (convert(varchar(300),t.nombre) 
                                            + ' ' + convert(varchar(300),isnull(t.Apellido1,''))     
                                            + '' + convert(varchar(300),isnull(t.apellido2,'')))) else '' end)),'"',''),
       EstBio = '',
       Gen =	RTRIM(LTRIM(isnull(case	when t.FkDocumentacionTipos = 1 then ''
										when t.sexo = 'H' then 'H'
										when t.sexo = 'M' then 'M'
								end,''))),
       FecNac = LTRIM(RTRIM(isnull(convert(varchar,t.FechaNacimiento,23), '' ))), --- FORMATO aaaa-mm-dd
       EstCiv= LTRIM(RTRIM(isnull(case	when t.FkDocumentacionTipos = 1 then ''
					when t.FkEstadoCivilTipos = 'C'  THEN 'C'
					when t.FkEstadoCivilTipos = 'D'  THEN 'D'
					when t.FkEstadoCivilTipos = 'DE' THEN 'DE'
					when t.FkEstadoCivilTipos = 'P'  THEN 'P'
					when t.FkEstadoCivilTipos = 'S'  THEN 'S'
					when t.FkEstadoCivilTipos = 'SE' THEN 'SE'
					when t.FkEstadoCivilTipos = 'V'  THEN 'V' 
			END,''))),
       Email= LTRIM(RTRIM(isnull(c.Email,''))),
       MunRes= LTRIM(RTRIM(isnull(substring(dir.FkCodigospostales,1,2)+substring(dir.FkCodigospostales,3,4),''))), 
       DepRes= LTRIM(RTRIM(isnull(substring(dir.FkCodigospostales,1,2),''))),

       DirRes= LTRIM(RTRIM(isnull(convert(varchar(300),dir.FkCalleTipos),'') + ' ' + isnull(convert(varchar(300),dir.NombreCalle),'') + ' ' + 
			isnull(convert(varchar(300),dir.Numero),'' ) + ' ' + isnull(convert(varchar(300),dir.Bloque),'' ) + ' ' + 
			isnull(convert(varchar(300),dir.Piso),'' ) + ' ' + isnull(convert(varchar(300),dir.Puerta),'') + ' ' + 
			isnull(convert(varchar(300),dir.Complemento),''))),


       BarRes = '',
	   --TelRes =  REPLACE(LTRIM(RTRIM(isnull(tel.Numero,''))), CHAR(8203), ''), -- 2023/09/06 - DANIEL: PARA ELIMINAR CARACTERES ASCII
	   TelRes =  LTRIM(RTRIM(isnull(tel.Numero,''))), -- 2023/09/07 - JCS: SE REVERSÓ PQ EL CAMPO QUEDABA NULL
       PkEmail = isnull(c.PkTerceroEmails_Iden,' '),
	   PkDirRes = isnull(dir.PkTerceroDirecciones_Iden,' '),
	   PkTelRes = isnull(tel.PkTerceroTelefonos_Iden,' '),
       t.FechaMod
  from [DBMLC_0190]..vw_terceros_registro_unico				t
  left join	spiga_TercerosDirecciones	dir	on	t.PkTerceros = dir.PkFkTerceros
                                            and  dir.FechaBaja is null
  left join	spiga_TercerosCorreos		c	on	t.PkTerceros = c.PkFkTerceros 
                                           and isnull(c.FkTerceroDirecciones,1) = dir.PkTerceroDirecciones_Iden
										   and c.FechaBaja is null
  left join	spiga_TercerosTelefonos		tel	on	t.PkTerceros = tel.PkFkTerceros 
                                            and dir.PkTerceroDirecciones_Iden= isnull(tel.FkTerceroDirecciones,1)
											and  tel.FechaBaja is null
 where t.NifCif is not null
   and t.NifCif <> '0'
   and (isnull(t.NombreComercial,' ')+' '+ (convert(varchar(300),t.nombre)  + ' ' + convert(varchar(300),isnull(t.Apellido1,''))    
                                                              + ' ' + convert(varchar(300),isnull(t.apellido2,''))) <>' ')

--MS:010324 se agrega este union para reenviar unos datos seleccionados por Juan Pablo Bolivar presente quitar esta parte al finalizar el proceso
union all 
select [Id_Proyecto]						,[Ideorg]                  ,[Fte]       ,[Token_user]
      ,[Identificador_Aleatorio]			,[ContadorIdentificador]   ,[ConfPost]  ,[ideuser]
      ,[tiptra]								,[Codter]                  ,[TipDoc]    ,[NumDoc]
      ,[Nom1]                       ,		 [Nom2]                    ,[Ape1]      ,[Ape2]
      ,[RazSoc] = REPLACE(RazSoc, '"', '')  ,[EstBio]                  ,[Gen]       ,[FecNac]
      ,[EstCiv]                             ,[Email]				   ,[MunRes]    ,[DepRes] 
      ,[DirRes]                             ,[BarRes]                  ,[TelRes]    ,[PkEmail]
      ,[PkDirRes]                           ,[PkTelRes]                ,[FechaMod] 
 from [DBMLC_0190]..[CalidadDeDatos_Export_Reenvio]


union all
--MS: 110724  se adiciona union con la infromaicon de los empleados creados dia a dia
select distinct  Id_Proyecto = 1,   
       Ideorg='casatoro',   
       Fte='spiga',   
       Token_user='k6eu84doz0hym7yjeu13mck2tkrfun67quhx412l3u', -- DA: 2024/07/11 - IMPORTANTE! - TEST
	 --Token_user='zWTsJ34qIc638g1bZaz9ArsD1TXdvNEVD9yTOORJfl', -- DA: 2024/07/11 - IMPORTANTE! - PRODUCCIÓN
       Identificador_Aleatorio = CONVERT(varchar,year(getdate())) 
							     + case when month(getdate()) < 10 then '0' + CONVERT(varchar,month(getdate())) else CONVERT(varchar,month(getdate())) end 
							     + CONVERT(varchar,day(getdate()))
							     + convert(varchar,rtrim(ltrim(replace(replace(replace(convert(varchar(300),CONVERT (time, SYSDATETIME())) ,':',''),'.',''),'  ','')))) 
							     + convert(varchar,row_number() over(order by t.NifCif asc))
							     + replace(convert(varchar,t.IdTerceros),' ','')
								 + replace(convert(varchar,t.Nifcif),' ',''),      
       
	   
	   ContadorIdentificador=1,                
	   ConfPost=1,    
	   ideuser=isnull(convert(varchar(100),t.UserMod),''),       
	   tiptra = 'A',
	   Codter = t.IdTerceros,
       TipDoc= isnull(convert(varchar(100),tt.FkDocumentacionTipos),''),
       NumDoc=isnull(convert(varchar(100),t.NifCif),''),
       Nom1 = replace(RTRIM(LTRIM(isnull(case when tt.FkDocumentacionTipos = 1 then isnull(replace(tt.NombreComercial,'',NULL), 
																						 (convert(varchar(300),t.nombre) 
                                                                                           + ' ' + convert(varchar(300),isnull(t.Apellido1,''))     
                                                                                           + ' ' + convert(varchar(300),isnull(t.apellido2,''))))
	                                  else case when charindex(' ',t.nombre,2) = 0 then t.nombre 
							                    when charindex(' ',t.nombre,2) = 2 then t.nombre
		                                        else substring(t.nombre,1,(charindex(' ',t.nombre,2))) end
		                         end,' '))),'"',''),
       Nom2=  replace(RTRIM(LTRIM(isnull(case when tt.FkDocumentacionTipos = 1 then '' 
	                                  else case when charindex(' ',t.nombre,1) = 1 then  ''
		                                        when charindex(' ',t.nombre,2) <> 0 then  substring(t.nombre,(charindex(' ',t.nombre,2)+1),30) 
											    else  '' end
									  end,''))),'"',''),
       Ape1= replace(LTRIM(RTRIM(isnull(t.Apellido1,'' ))),'"',''),
	   Ape2= replace(LTRIM(RTRIM(isnull(t.Apellido2,'' ))),'"',''),
       RazSoc = replace(LTRIM(RTRIM(case when tt.FkDocumentacionTipos = 1 then isnull(tt.NombreComercial, (convert(varchar(300),t.nombre) 
                                            + ' ' + convert(varchar(300),isnull(t.Apellido1,''))     
                                            + '' + convert(varchar(300),isnull(t.apellido2,'')))) else '' end)),'"',''),
       EstBio = '',
       Gen =	RTRIM(LTRIM(isnull(case	when tt.FkDocumentacionTipos = 1 then ''
										when tt.sexo = 'H' then 'H'
										when tt.sexo = 'M' then 'M'
								end,''))),
       FecNac = LTRIM(RTRIM(isnull(convert(varchar,tt.FechaNacimiento,23), '' ))), 
       EstCiv= LTRIM(RTRIM(isnull(case	when tt.FkDocumentacionTipos = 1 then ''
					when tt.FkEstadoCivilTipos = 'C'  THEN 'C'
					when tt.FkEstadoCivilTipos = 'D'  THEN 'D'
					when tt.FkEstadoCivilTipos = 'DE' THEN 'DE'
					when tt.FkEstadoCivilTipos = 'P'  THEN 'P'
					when tt.FkEstadoCivilTipos = 'S'  THEN 'S'
					when tt.FkEstadoCivilTipos = 'SE' THEN 'SE'
					when tt.FkEstadoCivilTipos = 'V'  THEN 'V' 
			END,''))),
       Email= LTRIM(RTRIM(isnull(c.Email,''))),
       MunRes= LTRIM(RTRIM(isnull(substring(dir.FkCodigospostales,1,2)+substring(dir.FkCodigospostales,3,4),''))), 
       DepRes= LTRIM(RTRIM(isnull(substring(dir.FkCodigospostales,1,2),''))),

       DirRes= LTRIM(RTRIM(isnull(convert(varchar(300),dir.FkCalleTipos),'') + ' ' + isnull(convert(varchar(300),dir.NombreCalle),'') + ' ' + 
			isnull(convert(varchar(300),dir.Numero),'' ) + ' ' + isnull(convert(varchar(300),dir.Bloque),'' ) + ' ' + 
			isnull(convert(varchar(300),dir.Piso),'' ) + ' ' + isnull(convert(varchar(300),dir.Puerta),'') + ' ' + 
			isnull(convert(varchar(300),dir.Complemento),''))),


       BarRes = '',
	   TelRes =  LTRIM(RTRIM(isnull(tel.Numero,''))),
       PkEmail = isnull(c.PkTerceroEmails_Iden,' '),
	   PkDirRes = isnull(dir.PkTerceroDirecciones_Iden,' '),
	   PkTelRes = isnull(tel.PkTerceroTelefonos_Iden,' '),
       tt.FechaMod

  from [PSCService_DB].[dbo].spiga_Empleados t
  left join [PSCService_DB]..spiga_Terceros tt on tt.PkTerceros = t.IdTerceros
  left join	spiga_TercerosDirecciones	dir	on t.IdTerceros = dir.PkFkTerceros
  left join	spiga_TercerosCorreos		c	on t.IdTerceros = c.PkFkTerceros 
                                           and dir.FechaBaja is null
                                           and isnull(c.FkTerceroDirecciones,1) = dir.PkTerceroDirecciones_Iden
  										   and c.FechaBaja is null
  left join	spiga_TercerosTelefonos		tel	on t.IdTerceros = tel.PkFkTerceros 
                                           and dir.PkTerceroDirecciones_Iden= isnull(tel.FkTerceroDirecciones,1)
  										   and tel.FechaBaja is null
 where (isnull(tt.NombreComercial,' ')+' '+ (convert(varchar(300),t.nombre)  + ' ' + convert(varchar(300),isnull(t.Apellido1,''))    
                                                              + ' ' + convert(varchar(300),isnull(t.apellido2,''))) <>' ')
   and t.FechaAlta=getdate()-1


```
