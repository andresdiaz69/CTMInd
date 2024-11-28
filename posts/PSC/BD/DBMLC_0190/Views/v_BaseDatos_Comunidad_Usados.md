# View: v_BaseDatos_Comunidad_Usados

## Usa los objetos:
- [[ComisionesSpigaVO]]
- [[spiga_Terceros]]
- [[spiga_TercerosCorreos]]
- [[spiga_TercerosDirecciones]]
- [[spiga_TercerosTelefonos]]
- [[vw_TercerosCelularUltimaFechaActualizacion]]

```sql

--DROP VIEW v_BaseDatos_Comunidad_Usados
CREATE VIEW [dbo].[v_BaseDatos_Comunidad_Usados] as
SELECT DISTINCT empresa,
centro=replace(replace(replace(replace(replace(replace(centro,char(13)+char(10)+'-',''),char(09),''),char(10),''),char(13),''),char(34),''),char(248),''),
FechaFactura,FechaEntregaCliente,Vin,
Marca=replace(replace(replace(replace(replace(replace(Marca,char(13)+char(10)+'-',''),char(09),''),char(10),''),char(13),''),char(34),''),char(248),''),
Gama=replace(replace(replace(replace(replace(replace(Gama,char(13)+char(10)+'-',''),char(09),''),char(10),''),char(13),''),char(34),''),char(248),''),
CodigoModelo=replace(replace(replace(replace(replace(replace(CodigoModelo,char(13)+char(10)+'-',''),char(09),''),char(10),''),char(13),''),char(34),''),char(248),''),
AñoModelo,
Modelo=replace(replace(replace(replace(replace(replace(Modelo,char(13)+char(10)+'-',''),char(09),''),char(10),''),char(13),''),char(34),''),char(248),''),nit, 
NombreTercero=REPLACE(REPLACE(REPLACE(UPPER(NombreTercero),' ','<>'),'><',''),'<>',' '), celular, telefono=t.fijo, direccion, email, FechaAlta, PrecioVehiculo

--Nit = case when Habeas = 0 then Nit else 'NO autorizo tratamiento de datos' end,
--nombreTercero = case when habeas = 0 then replace(replace(replace(replace(replace(replace(nombreTercero ,char(13)+char(10)+'-',''),char(09),''),char(10),''),char(13),''),char(34),''),char(248),'')
--else 'NO autorizo tratamiento de datos' end,
--Celular = case when habeas = 0 then t.Celular else 'NO autorizo tratamiento de datos' end,
--Telefono = case when habeas = 0 then t.fijo else 'NO autorizo tratamiento de datos' end,
--Direccion = case when habeas = 0 then t.Direccion else 'NO autorizo tratamiento de datos' end,
--Email = case when habeas = 0 then t.email else 'NO autorizo tratamiento de datos' end,t.FechaAlta
FROM(
	 SELECT empresa,centro,FechaFactura,FechaEntregaCliente,Vin,Marca,Gama,CodigoModelo,AñoModelo,Modelo,Nit,nombreTercero,PrecioVehiculo
	 --,Habeas = isnull(p.ValorBool,0)
	 FROM(
		  SELECT cantidad = row_number() over (partition by vin order by FechaFactura desc),
		  año=year(vo.FechaEntregaCliente),mes=month(vo.FechaEntregaCliente),vo.Empresa,vo.Centro,vo.FechaFactura,vo.FechaEntregaCliente,
		  vo.vin,vo.Marca,vo.Gama,vo.CodigoModelo,vo.AñoModelo,vo.Modelo,vo.Nit,vo.NombreTercero,vo.EntregaEfectiva,vo.PrecioVehiculo
		  FROM ComisionesSpigaVO vo
		  WHERE --vo.vin = '1FFDCDH1KFC330688'
		  EntregaEfectiva = 1
		  AND vo.codigomarca IN(2,6,12,13,19,20,22,216,245,263,317,329)
		  and vo.Empresa <> '24'
			--and vo.nit = '79937991'
	      )a --left join v_habeas_data	p	on	a.nit = p.NumDocumento
	 WHERE cantidad = 1
) b 
LEFT JOIN (SELECT DISTINCT PkTerceros, NifCif, email, celular=Numero, Fijo, direccion, FechaAlta
		   FROM( SELECT PkTerceros, NifCif, b.email, d.Numero, e.Fijo, g.direccion, FechaAlta
		   FROM( SELECT DISTINCT PkTerceros, NifCif,  k.Numero, FechaAlta
		   FROM(SELECT orden=row_number() over (partition by nifcif order by fechamod desc), NifCif, PkTerceros, FechaAlta
		   FROM [PSCService_DB].dbo.spiga_Terceros ) b 			    
		   LEFT JOIN (SELECT DISTINCT Numero, PkFkTerceros FROM vw_TercerosCelularUltimaFechaActualizacion) k ON b.PkTerceros=k.PkFkTerceros
		   WHERE orden = 1 AND PkTerceros IS NOT NULL )a
LEFT JOIN (SELECT DISTINCT PkFkTerceros, email 
		  FROM( SELECT orden=row_number() over (partition by PkFkTerceros order by FechaMod desc), 
		  PkFkTerceros,email FROM [PSCService_DB].dbo.spiga_TercerosCorreos		
		  WHERE Principal = 1 )a WHERE orden = 1 )  b ON a.PkTerceros=b.PkFkTerceros
LEFT JOIN (SELECT PkFkTerceros,Numero = celular
		   FROM( SELECT DISTINCT PkFkTerceros,Fijo=max(fijo),celular=max(Celular)
		   FROM( SELECT DISTINCT PkFkTerceros,Fijo,Celular 
		   FROM( SELECT DISTINCT orden=row_number() over (partition by PkFkTerceros order by FechaMod desc), 
		   PkFkTerceros, FkTelefonoTipos,Fijo='',Celular=numero,FkTerceroDirecciones FROM [PSCService_DB].dbo.spiga_TercerosTelefonos	
		   WHERE FkTelefonoTipos = 3 )a WHERE orden = 1  )b GROUP BY PkFkTerceros )c) d ON a.PkTerceros=d.PkFkTerceros
LEFT JOIN (SELECT DISTINCT PkFkTerceros,Fijo=max(fijo)
		   FROM( SELECT DISTINCT PkFkTerceros, Fijo  
		   FROM( SELECT DISTINCT orden=row_number() over (partition by PkFkTerceros order by FechaMod desc), 
		   PkFkTerceros, Fijo=numero FROM [PSCService_DB].dbo.spiga_TercerosTelefonos	
		   WHERE PkTerceroTelefonos_Iden = 1 )a WHERE orden = 1  )b GROUP BY PkFkTerceros) e ON a.PkTerceros=e.PkFkTerceros
LEFT JOIN (SELECT PkFkTerceros 
		   , direccion = isnull(convert(varchar, a.FkCalleTipos),'') + ' ' + isnull(convert(varchar, a.NombreCalle),'') 
		   + ' ' + isnull(convert(varchar,a.numero),'')
		   FROM( SELECT orden=row_number() over (partition by PkFkTerceros order by fechamod desc)
		   , provincia, Poblacion, PkFkTerceros, FkCalleTipos, NombreCalle, numero FROM [PSCService_DB].dbo.spiga_TercerosDirecciones )a
		   WHERE orden = 1)g ON a.PkTerceros=g.PkFkTerceros )b )t ON t.NifCif=b.Nit

--LEFT JOIN SpigaFichaLlamadaAgendamientoDatosTerceroFechaAlta t ON t.NifCif = b.Nit
--where FechaEntregaCliente > '20190930' and FechaEntregaCliente < '20200301'
--order by FechaEntregaCliente
 


```
