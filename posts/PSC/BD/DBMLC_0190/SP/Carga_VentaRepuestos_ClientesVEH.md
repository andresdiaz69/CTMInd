# Stored Procedure: Carga_VentaRepuestos_ClientesVEH

## Usa los objetos:
- [[ComisionesSpigaAlmacenAlbaran]]
- [[ComisionesSpigaTallerPorOT]]
- [[vw_Centros_Marca]]
- [[vw_spiga_limite_Credito]]
- [[vw_VentaRepuestos_ClientesJD_terceros]]

```sql
CREATE PROCEDURE [dbo].[Carga_VentaRepuestos_ClientesVEH] 
AS

  SELECT CodigoEmpresa,Empresa,Año=year(FechaFactura),Mes=month(FechaFactura),CodigoCentro,centro,Nitcliente,
		NombreCliente,ValorRepuestosMostrador=sum(ValorNeto),
		ValorRepuestosTaller=0,ValorManoObra=0,ValorVar=0,descripciontrabajo = ''
  INTO #ComisionesSpigaAlmacenAlbaran
	  FROM ComisionesSpigaAlmacenAlbaran
	  WHERE Centro not like 'JD%'
	  GROUP BY CodigoEmpresa,Empresa,year(FechaFactura),month(FechaFactura),CodigoCentro,centro,Nitcliente,NombreCliente
	  
  select CodigoEmpresa,Empresa,Año=year(FechaFactura),Mes=month(FechaFactura),CodigoCentro,centro,Nitcliente,NombreCliente,
		ValorRepuestosMostrador=0, ValorRepuestosTaller=case when TipoOperacion = 'MAT' then sum(ValorNeto) else 0 end,
		ValorManoObra=case when TipoOperacion in ('MO','PIN','SUB') then sum(ValorNeto) else 0 end,
		ValorVar= case when TipoOperacion in ('VAR') then sum(ValorNeto) else 0 end,descripciontrabajo
	into #ComisionesSpigaTallerPorOT
	  FROM ComisionesSpigaTallerPorOT
	  WHERE centro not like 'JD%'
	  GROUP BY CodigoEmpresa,Empresa,year(FechaFactura),month(FechaFactura),CodigoCentro,centro,Nitcliente,NombreCliente,
	    TipoOperacion,descripciontrabajo
		
	  

  SELECT 
  DISTINCT
	s.CodigoEmpresa,s.Empresa,s.Año,s.Mes,m.CodigoMarca,m.Marca,s.CodigoCentro,s.Centro,Nitcliente,NombreCliente,
	ValorRepuestosMostrador=sum(ValorRepuestosMostrador),
	ValorRepuestosTaller=sum(ValorRepuestosTaller),ValorManoObra=sum(ValorManoObra),ValorVar=sum(ValorVar),
	celular,fijo,Direccion,Poblacion,Email,EmailOtro,LimiteCredito,descripciontrabajo
  FROM
  (
	SELECT 
	DISTINCT 
	  CodigoEmpresa,Empresa,Año,Mes,CodigoCentro,Centro,Nitcliente,NombreCliente,ValorRepuestosMostrador=sum(ValorRepuestosMostrador),
	  ValorRepuestosTaller=sum(ValorRepuestosTaller),ValorManoObra=sum(ValorManoObra),ValorVar=sum(ValorVar),
	  t.celular,t.fijo,t.Direccion,t.Poblacion,t.Email,t.EmailOtro,c.LimiteCredito,a.descripciontrabajo
	from
	  (
	  SELECT CodigoEmpresa,Empresa,Año,Mes,CodigoCentro,centro,Nitcliente,
		NombreCliente,ValorRepuestosMostrador,
		ValorRepuestosTaller,ValorManoObra,ValorVar,descripciontrabajo
	  FROM #ComisionesSpigaAlmacenAlbaran
	  UNION ALL
	  SELECT
	  DISTINCT
	  CodigoEmpresa,Empresa,Año,Mes,CodigoCentro,centro,Nitcliente,NombreCliente,
		ValorRepuestosMostrador, ValorRepuestosTaller,
		ValorManoObra,
		ValorVar,descripciontrabajo
	  FROM #ComisionesSpigaTallerPorOT
	  )a  
	  
	  left join vw_VentaRepuestos_ClientesJD_terceros t	on	a.Nitcliente = t.NifCif
	  left join vw_spiga_limite_Credito c on convert(varchar,t.pkterceros) = convert(varchar,c.PkFkTerceros) and pkfkempresas = 1
	  WHERE CodigoEmpresa = 1
	  GROUP BY  CodigoEmpresa,Empresa,Año,Mes,CodigoCentro,Centro,Nitcliente,NombreCliente,t.celular,t.fijo,t.Direccion,t.Poblacion,t.Email,t.EmailOtro,c.LimiteCredito,
		descripciontrabajo

	  union all

	  --ALTER VIEW [dbo].[vw_VentaRepuestos_ClientesJD] AS
	  SELECT
	  DISTINCT
	  CodigoEmpresa,Empresa,Año,Mes,CodigoCentro,Centro,Nitcliente,NombreCliente,ValorRepuestosMostrador=sum(ValorRepuestosMostrador),
		ValorRepuestosTaller=sum(ValorRepuestosTaller),ValorManoObra=sum(ValorManoObra),ValorVar=sum(ValorVar),
		t.celular,t.fijo,t.Direccion,t.Poblacion,t.Email,t.EmailOtro,c.LimiteCredito,a.descripciontrabajo
	  FROM
	  (
		SELECT CodigoEmpresa,Empresa,Año,Mes,CodigoCentro,centro,Nitcliente,
		NombreCliente,ValorRepuestosMostrador,
		ValorRepuestosTaller,ValorManoObra,ValorVar,descripciontrabajo
		FROM #ComisionesSpigaAlmacenAlbaran
		
		union all

		SELECT 
	  DISTINCT
	  CodigoEmpresa,Empresa,Año,Mes,CodigoCentro,centro,Nitcliente,NombreCliente,
		ValorRepuestosMostrador, ValorRepuestosTaller,
		ValorManoObra,
		ValorVar,descripciontrabajo
	  FROM #ComisionesSpigaTallerPorOT
	  ) a
		
	  LEFT JOIN vw_VentaRepuestos_ClientesJD_terceros t	on a.Nitcliente = t.NifCif
	  LEFT JOIN vw_spiga_limite_Credito c on convert(varchar,t.pkterceros) = convert(varchar,c.PkFkTerceros)
		and pkfkempresas = 6
	  WHERE CodigoEmpresa = 6
	  GROUP BY CodigoEmpresa,Empresa,Año,Mes,CodigoCentro,Centro,Nitcliente,NombreCliente,t.celular,t.fijo,t.Direccion,t.Poblacion,t.Email,
		t.EmailOtro,c.LimiteCredito, descripciontrabajo

	 UNION ALL

		--ALTER VIEW [dbo].[vw_VentaRepuestos_ClientesJD] AS
	  SELECT 
	  DISTINCT 
		CodigoEmpresa,Empresa,Año,Mes,CodigoCentro,Centro,Nitcliente,NombreCliente,ValorRepuestosMostrador=sum(ValorRepuestosMostrador),
		ValorRepuestosTaller=sum(ValorRepuestosTaller),ValorManoObra=sum(ValorManoObra),ValorVar=sum(ValorVar),
		t.celular,t.fijo,t.Direccion,t.Poblacion,t.Email,t.EmailOtro,c.LimiteCredito,descripciontrabajo
	  FROM
	  (
				SELECT CodigoEmpresa,Empresa,Año,Mes,CodigoCentro,centro,Nitcliente,
		NombreCliente,ValorRepuestosMostrador,
		ValorRepuestosTaller,ValorManoObra,ValorVar,descripciontrabajo
		FROM #ComisionesSpigaAlmacenAlbaran

		UNION ALL

		SELECT
		DISTINCT 
	  CodigoEmpresa,Empresa,Año,Mes,CodigoCentro,centro,Nitcliente,NombreCliente,
		ValorRepuestosMostrador, ValorRepuestosTaller,
		ValorManoObra,
		ValorVar,descripciontrabajo
	  FROM #ComisionesSpigaTallerPorOT
		)a
	  left join vw_VentaRepuestos_ClientesJD_terceros t on a.Nitcliente = t.NifCif
	  left join vw_spiga_limite_Credito c on convert(varchar,t.pkterceros) = convert(varchar,c.PkFkTerceros)
		and pkfkempresas = 3
	  WHERE CodigoEmpresa = 3
	  GROUP BY CodigoEmpresa,Empresa,Año,Mes,CodigoCentro,Centro,Nitcliente,NombreCliente,t.celular,t.fijo,t.Direccion,t.Poblacion,t.Email,
	    t.EmailOtro,c.LimiteCredito, descripciontrabajo

	  UNION ALL

	  SELECT 
	  DISTINCT
		CodigoEmpresa,Empresa,Año,Mes,CodigoCentro,Centro,Nitcliente,NombreCliente,ValorRepuestosMostrador=sum(ValorRepuestosMostrador),
		ValorRepuestosTaller=sum(ValorRepuestosTaller),ValorManoObra=sum(ValorManoObra),ValorVar=sum(ValorVar),
		t.celular,t.fijo,t.Direccion,t.Poblacion,t.Email,t.EmailOtro,c.LimiteCredito,descripciontrabajo
	  FROM
	  (
		SELECT CodigoEmpresa,Empresa,Año,Mes,CodigoCentro,centro,Nitcliente,
		NombreCliente,ValorRepuestosMostrador,
		ValorRepuestosTaller,ValorManoObra,ValorVar,descripciontrabajo
		FROM #ComisionesSpigaAlmacenAlbaran
		
		UNION ALL

		SELECT 
		DISTINCT
		  CodigoEmpresa,Empresa,Año=year(FechaFactura),Mes=month(FechaFactura),CodigoCentro,centro,Nitcliente,NombreCliente,
		  ValorRepuestosMostrador=0, ValorRepuestosTaller=case when TipoOperacion = 'MAT' then sum(ValorNeto) else 0 end,
		  ValorManoObra=case when TipoOperacion in ('MO','PIN','SUB') then sum(ValorNeto) else 0 end,
		  ValorVar= case when TipoOperacion in ('VAR') then sum(ValorNeto) else 0 end,descripciontrabajo
		FROM #ComisionesSpigaTallerPorOT
		)a  
	  LEFT JOIN vw_VentaRepuestos_ClientesJD_terceros t on	a.Nitcliente = t.NifCif
	  LEFT JOIN vw_spiga_limite_Credito c	on convert(varchar,t.pkterceros) = convert(varchar,c.PkFkTerceros) and pkfkempresas = 5
	  WHERE  CodigoEmpresa = 5
	  GROUP BY CodigoEmpresa,Empresa,Año,Mes,CodigoCentro,Centro,Nitcliente,NombreCliente,t.celular,t.fijo,t.Direccion,
		t.Poblacion,t.Email,t.EmailOtro,c.LimiteCredito, descripciontrabajo
	)s 



  LEFT JOIN [dbo].[vw_Centros_Marca]  m	on s.CodigoCentro = m.CodigoCentro
  GROUP BY CodigoEmpresa,Empresa,s.Año,s.Mes,m.CodigoMarca,m.Marca,s.CodigoCentro,s.Centro,Nitcliente,NombreCliente,celular,fijo,Direccion,Poblacion,Email,EmailOtro,LimiteCredito,descripciontrabajo

```
