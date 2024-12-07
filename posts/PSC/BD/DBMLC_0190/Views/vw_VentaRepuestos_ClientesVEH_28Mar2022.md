# View: vw_VentaRepuestos_ClientesVEH_28Mar2022

## Usa los objetos:
- [[ComisionesSpigaAlmacenAlbaran]]
- [[ComisionesSpigaTallerPorOT]]
- [[vw_Centros_Marca]]
- [[vw_spiga_limite_Credito]]
- [[vw_VentaRepuestos_ClientesJD_terceros]]

```sql
create VIEW [dbo].[vw_VentaRepuestos_ClientesVEH_28Mar2022] AS
select distinct s.CodigoEmpresa,s.Empresa,s.Año,s.Mes,m.CodigoMarca,m.Marca,s.CodigoCentro,s.Centro,Nitcliente,NombreCliente,ValorRepuestosMostrador=sum(ValorRepuestosMostrador),
ValorRepuestosTaller=sum(ValorRepuestosTaller),ValorManoObra=sum(ValorManoObra),ValorVar=sum(ValorVar),
celular,fijo,Direccion,Poblacion,Email,EmailOtro,LimiteCredito,descripciontrabajo
from(
		select distinct CodigoEmpresa,Empresa,Año,Mes,CodigoCentro,Centro,Nitcliente,NombreCliente,ValorRepuestosMostrador=sum(ValorRepuestosMostrador),
		ValorRepuestosTaller=sum(ValorRepuestosTaller),ValorManoObra=sum(ValorManoObra),ValorVar=sum(ValorVar),
		t.celular,t.fijo,t.Direccion,t.Poblacion,t.Email,t.EmailOtro,c.LimiteCredito,a.descripciontrabajo
		from(
			select CodigoEmpresa,Empresa,Año=year(FechaFactura),Mes=month(FechaFactura),CodigoCentro,centro,Nitcliente,NombreCliente,ValorRepuestosMostrador=sum(ValorNeto),
			ValorRepuestosTaller=0,ValorManoObra=0,ValorVar=0,descripciontrabajo = ''
			from ComisionesSpigaAlmacenAlbaran
			where centro not like 'JD%'
			group by CodigoEmpresa,Empresa,year(FechaFactura),month(FechaFactura),CodigoCentro,centro,Nitcliente,NombreCliente
			union all
			select distinct CodigoEmpresa,Empresa,Año=year(FechaFactura),Mes=month(FechaFactura),CodigoCentro,centro,Nitcliente,NombreCliente,ValorRepuestosMostrador=0,
			ValorRepuestosTaller=case when TipoOperacion = 'MAT' then sum(ValorNeto) else 0 end,
			ValorManoObra=case when TipoOperacion in ('MO','PIN','SUB') then sum(ValorNeto) else 0 end,
			ValorVar= case when TipoOperacion in ('VAR') then sum(ValorNeto) else 0 end,descripciontrabajo
			from ComisionesSpigaTallerPorOT
			where centro not like 'JD%'
			group by CodigoEmpresa,Empresa,year(FechaFactura),month(FechaFactura),CodigoCentro,centro,Nitcliente,NombreCliente,TipoOperacion,descripciontrabajo
		)a  left join vw_VentaRepuestos_ClientesJD_terceros	t	on	a.Nitcliente = t.NifCif
			left join vw_spiga_limite_Credito				c	on	convert(varchar,t.pkterceros) = convert(varchar,c.PkFkTerceros)
																	and pkfkempresas = 1
			where CodigoEmpresa = 1
		group by CodigoEmpresa,Empresa,Año,Mes,CodigoCentro,Centro,Nitcliente,NombreCliente,t.celular,t.fijo,t.Direccion,t.Poblacion,t.Email,t.EmailOtro,c.LimiteCredito,
		descripciontrabajo

		union all

		--ALTER VIEW [dbo].[vw_VentaRepuestos_ClientesJD] AS
		select distinct CodigoEmpresa,Empresa,Año,Mes,CodigoCentro,Centro,Nitcliente,NombreCliente,ValorRepuestosMostrador=sum(ValorRepuestosMostrador),
		ValorRepuestosTaller=sum(ValorRepuestosTaller),ValorManoObra=sum(ValorManoObra),ValorVar=sum(ValorVar),
		t.celular,t.fijo,t.Direccion,t.Poblacion,t.Email,t.EmailOtro,c.LimiteCredito,a.descripciontrabajo
		from(
			select CodigoEmpresa,Empresa,Año=year(FechaFactura),Mes=month(FechaFactura),CodigoCentro,centro,Nitcliente,NombreCliente,ValorRepuestosMostrador=sum(ValorNeto),
			ValorRepuestosTaller=0,ValorManoObra=0,ValorVar=0,descripciontrabajo = ''
			from ComisionesSpigaAlmacenAlbaran
			where centro not like 'JD%'
			group by CodigoEmpresa,Empresa,year(FechaFactura),month(FechaFactura),CodigoCentro,centro,Nitcliente,NombreCliente
			union all
			select distinct CodigoEmpresa,Empresa,Año=year(FechaFactura),Mes=month(FechaFactura),CodigoCentro,centro,Nitcliente,NombreCliente,ValorRepuestosMostrador=0,
			ValorRepuestosTaller=case when TipoOperacion = 'MAT' then sum(ValorNeto) else 0 end,
			ValorManoObra=case when TipoOperacion in ('MO','PIN','SUB') then sum(ValorNeto) else 0 end,
			ValorVar= case when TipoOperacion in ('VAR') then sum(ValorNeto) else 0 end,descripciontrabajo
			from ComisionesSpigaTallerPorOT
			where centro not like 'JD%'
			group by CodigoEmpresa,Empresa,year(FechaFactura),month(FechaFactura),CodigoCentro,centro,Nitcliente,NombreCliente,TipoOperacion,descripciontrabajo
		)a  left join vw_VentaRepuestos_ClientesJD_terceros	t	on	a.Nitcliente = t.NifCif
			left join vw_spiga_limite_Credito				c	on	convert(varchar,t.pkterceros) = convert(varchar,c.PkFkTerceros)
																	and pkfkempresas = 6
			where CodigoEmpresa = 6
		group by CodigoEmpresa,Empresa,Año,Mes,CodigoCentro,Centro,Nitcliente,NombreCliente,t.celular,t.fijo,t.Direccion,t.Poblacion,t.Email,t.EmailOtro,c.LimiteCredito,
		descripciontrabajo

		union all

		--ALTER VIEW [dbo].[vw_VentaRepuestos_ClientesJD] AS
		select distinct CodigoEmpresa,Empresa,Año,Mes,CodigoCentro,Centro,Nitcliente,NombreCliente,ValorRepuestosMostrador=sum(ValorRepuestosMostrador),
		ValorRepuestosTaller=sum(ValorRepuestosTaller),ValorManoObra=sum(ValorManoObra),ValorVar=sum(ValorVar),
		t.celular,t.fijo,t.Direccion,t.Poblacion,t.Email,t.EmailOtro,c.LimiteCredito,descripciontrabajo
		from(
			select CodigoEmpresa,Empresa,Año=year(FechaFactura),Mes=month(FechaFactura),CodigoCentro,centro,Nitcliente,NombreCliente,ValorRepuestosMostrador=sum(ValorNeto),
			ValorRepuestosTaller=0,ValorManoObra=0,ValorVar=0,descripciontrabajo = ''
			from ComisionesSpigaAlmacenAlbaran
			where centro not like 'JD%'
			group by CodigoEmpresa,Empresa,year(FechaFactura),month(FechaFactura),CodigoCentro,centro,Nitcliente,NombreCliente
			union all
			select distinct CodigoEmpresa,Empresa,Año=year(FechaFactura),Mes=month(FechaFactura),CodigoCentro,centro,Nitcliente,NombreCliente,ValorRepuestosMostrador=0,
			ValorRepuestosTaller=case when TipoOperacion = 'MAT' then sum(ValorNeto) else 0 end,
			ValorManoObra=case when TipoOperacion in ('MO','PIN','SUB') then sum(ValorNeto) else 0 end,
			ValorVar= case when TipoOperacion in ('VAR') then sum(ValorNeto) else 0 end,descripciontrabajo
			from ComisionesSpigaTallerPorOT
			where centro not like 'JD%'
			group by CodigoEmpresa,Empresa,year(FechaFactura),month(FechaFactura),CodigoCentro,centro,Nitcliente,NombreCliente,TipoOperacion,descripciontrabajo
		)a  left join vw_VentaRepuestos_ClientesJD_terceros	t	on	a.Nitcliente = t.NifCif
			left join vw_spiga_limite_Credito				c	on	convert(varchar,t.pkterceros) = convert(varchar,c.PkFkTerceros)
																	and pkfkempresas = 3
			where CodigoEmpresa = 3
		group by CodigoEmpresa,Empresa,Año,Mes,CodigoCentro,Centro,Nitcliente,NombreCliente,t.celular,t.fijo,t.Direccion,t.Poblacion,t.Email,t.EmailOtro,c.LimiteCredito,
		descripciontrabajo

		union all

		--ALTER VIEW [dbo].[vw_VentaRepuestos_ClientesJD] AS
		select distinct CodigoEmpresa,Empresa,Año,Mes,CodigoCentro,Centro,Nitcliente,NombreCliente,ValorRepuestosMostrador=sum(ValorRepuestosMostrador),
		ValorRepuestosTaller=sum(ValorRepuestosTaller),ValorManoObra=sum(ValorManoObra),ValorVar=sum(ValorVar),
		t.celular,t.fijo,t.Direccion,t.Poblacion,t.Email,t.EmailOtro,c.LimiteCredito,descripciontrabajo
		from(
			select CodigoEmpresa,Empresa,Año=year(FechaFactura),Mes=month(FechaFactura),CodigoCentro,centro,Nitcliente,NombreCliente,ValorRepuestosMostrador=sum(ValorNeto),
			ValorRepuestosTaller=0,ValorManoObra=0,ValorVar=0,descripciontrabajo = ''
			from ComisionesSpigaAlmacenAlbaran
			where centro not like 'JD%'
			group by CodigoEmpresa,Empresa,year(FechaFactura),month(FechaFactura),CodigoCentro,centro,Nitcliente,NombreCliente
			union all
			select distinct CodigoEmpresa,Empresa,Año=year(FechaFactura),Mes=month(FechaFactura),CodigoCentro,centro,Nitcliente,NombreCliente,ValorRepuestosMostrador=0,
			ValorRepuestosTaller=case when TipoOperacion = 'MAT' then sum(ValorNeto) else 0 end,
			ValorManoObra=case when TipoOperacion in ('MO','PIN','SUB') then sum(ValorNeto) else 0 end,
			ValorVar= case when TipoOperacion in ('VAR') then sum(ValorNeto) else 0 end,descripciontrabajo
			from ComisionesSpigaTallerPorOT
			where centro not like 'JD%'
			group by CodigoEmpresa,Empresa,year(FechaFactura),month(FechaFactura),CodigoCentro,centro,Nitcliente,NombreCliente,TipoOperacion,descripciontrabajo
		)a  left join vw_VentaRepuestos_ClientesJD_terceros	t	on	a.Nitcliente = t.NifCif
			left join vw_spiga_limite_Credito				c	on	convert(varchar,t.pkterceros) = convert(varchar,c.PkFkTerceros)
																	and pkfkempresas = 5
			where CodigoEmpresa = 5
		group by CodigoEmpresa,Empresa,Año,Mes,CodigoCentro,Centro,Nitcliente,NombreCliente,t.celular,t.fijo,t.Direccion,t.Poblacion,t.Email,t.EmailOtro,c.LimiteCredito,
		descripciontrabajo
)s left join [dbo].[vw_Centros_Marca]  m	on s.CodigoCentro = m.CodigoCentro
--where m.CodigoMarca = 12
--AND s.Año  =2020
--and s.CodigoEmpresa = 1
--and s.Nitcliente = '8002044628'
group by CodigoEmpresa,Empresa,s.Año,s.Mes,m.CodigoMarca,m.Marca,s.CodigoCentro,s.Centro,Nitcliente,NombreCliente,celular,fijo,Direccion,Poblacion,Email,EmailOtro,LimiteCredito,descripciontrabajo

```
