# Stored Procedure: sp_prueba_vw_VentaRepuestos_ClientesJD

## Usa los objetos:
- [[ComisionesSpigaAlmacenAlbaran]]
- [[ComisionesSpigaTallerPorOT]]
- [[vw_Centros_Marca]]
- [[vw_spiga_limite_Credito]]
- [[vw_VentaRepuestos_ClientesJD_terceros]]

```sql
CREATE PROCEDURE [dbo].[sp_prueba_vw_VentaRepuestos_ClientesJD] 

	@Año as smallint,
	@Mes as smallint,
	@codigoempresa as smallint

AS

BEGIN	
	SET NOCOUNT ON

		if object_id(N'tempdb.dbo.#Temporal', N'U') is not null
			drop TABLE #Temporal


select distinct s.CodigoEmpresa,s.Empresa,s.Año,s.Mes,m.CodigoMarca,m.Marca,s.CodigoCentro,s.Centro,Nitcliente,NombreCliente,ValorRepuestosMostrador=sum(ValorRepuestosMostrador),
ValorRepuestosTaller=sum(ValorRepuestosTaller),ValorManoObra=sum(ValorManoObra),ValorVar=sum(ValorVar),
celular,fijo,Direccion,Poblacion,Email,EmailOtro,LimiteCredito,descripciontrabajo
	into #temporal
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
																	and pkfkempresas = CodigoEmpresa
		
		where CodigoEmpresa=@codigoempresa
		and Año = @año
		and Mes = @Mes
		group by CodigoEmpresa,Empresa,Año,Mes,CodigoCentro,Centro,Nitcliente,NombreCliente,t.celular,t.fijo,t.Direccion,t.Poblacion,t.Email,t.EmailOtro,c.LimiteCredito,
		descripciontrabajo
)s left join [dbo].[vw_Centros_Marca]  m	on s.CodigoCentro = m.CodigoCentro
group by CodigoEmpresa,Empresa,s.Año,s.Mes,m.CodigoMarca,m.Marca,s.CodigoCentro,s.Centro,Nitcliente,NombreCliente,celular,fijo,Direccion,Poblacion,Email,EmailOtro,LimiteCredito,descripciontrabajo
end

select * from #temporal
```
