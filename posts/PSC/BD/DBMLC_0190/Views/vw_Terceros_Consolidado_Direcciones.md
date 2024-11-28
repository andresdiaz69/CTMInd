# View: vw_Terceros_Consolidado_Direcciones

## Usa los objetos:
- [[vw_Terceros_Direcciones]]

```sql



CREATE view [dbo].[vw_Terceros_Consolidado_Direcciones] as
select t.PkfkTerceros PkTerceros, 
       t.fkPaises    PrincipalPais, t.fkpoblaciones   fkPoblacionPrincipal, t.ciudad ciudadPrincipal,   t.direccion Direccion_Principal,   t.FkProvincias FkProvinciaPrincipal,  t.provincia provinciaPrincipal ,             
       dc.fkPaises   casadirPais1,  dc.fkpoblaciones  fkpoblacioncasa1,     dc.ciudad ciudadCasa1,      dc.direccion Direccion_casa1,      dc.FkProvincias FkProvinciaCasa1,       dc.provincia provinciaCasa1 ,
	   dcs.fkPaises  casadirPais2,  dcs.fkpoblaciones fkpoblacioncasa2,     dcs.ciudad ciudadCasa2,     dcs.direccion Direccion_casa2,     dcs.FkProvincias FkProvinciaCasa2,      dcs.provincia provinciaCasa2 ,
	   do.fkPaises   ofidirPais1,   do.fkpoblaciones  fkpoblacionOficina1,  do.ciudad ciudadOficina1,   do.direccion Direccion_oficina1,   do.FkProvincias FkProvinciaoficina1,    do.provincia provinciaoficina1 ,
	   dos.fkPaises  ofidirPais2,   dos.fkpoblaciones fkpoblacionOficina2,  dos.ciudad ciudadOficina2,  dos.direccion Direccion_oficina2,  dos.FkProvincias FkProvinciaoficina2,   dos.provincia provinciaoficina2 ,	
	   da.fkPaises   otradirPais1,  da.fkpoblaciones  fkpoblacionOtra1,     da.ciudad ciudadOtra1,      da.direccion Direccion_Otra1,      da.FkProvincias FkProvinciaOtra1,       da.provincia provinciaOtra1 ,
       das.fkPaises  otradirPais2,  das.fkpoblaciones fkpoblacionOtra2,     das.ciudad ciudadOtra2,     das.direccion Direccion_Otra2,     das.FkProvincias FKprovinciaOtra2,     das.provincia provinciaOtra2 
       
  from  [DBMLC_0190].dbo.VW_Terceros_direcciones (NOLOCK)  t --on t.PkTerceros = t.PkFkTerceros
	                                                             
  left join [DBMLC_0190].dbo.VW_Terceros_direcciones  (NOLOCK) dc on t.PkfkTerceros = dc.PkFkTerceros
                                                              and dc.orden =1	
													          and dc.fkdireccionTipos  = 1
  left join [DBMLC_0190].dbo.VW_Terceros_direcciones (NOLOCK)	  dcs on t.PkfkTerceros = dcs.PkFkTerceros
                                                         and dcs.orden =2
  													   and dcs.fkdireccionTipos = 1
  left join [DBMLC_0190].dbo.VW_Terceros_direcciones  (NOLOCK)	 do on t.PkfkTerceros = do.PkFkTerceros
                                                         and do.orden =1	
  													   and do.fkdireccionTipos  = 2
  left join [DBMLC_0190].dbo.VW_Terceros_direcciones (NOLOCK)	 dos on t.PkfkTerceros = dos.PkFkTerceros
                                                         and dos.orden =2	
  													   and dos.fkdireccionTipos = 2
  left join [DBMLC_0190].dbo.VW_Terceros_direcciones  (NOLOCK)	 da on t.PkfkTerceros = da.PkFkTerceros
	                                                       and da.orden =1
														   and da.fkdireccionTipos  = 3
  left join [DBMLC_0190].dbo.VW_Terceros_direcciones (NOLOCK)	 das on t.PkfkTerceros = das.PkFkTerceros
	                                                       and das.orden =2
														   and das.fkdireccionTipos = 3
  
where t.principal =1
--and t.PkfkTerceros = 774692

```
