# View: vw_VentaRepuestos_ClientesJD

## Usa los objetos:
- [[ComisionesSpigaAlmacenAlbaran]]
- [[ComisionesSpigaTallerPorOT]]
- [[vw_spiga_limite_Credito]]
- [[vw_VentaRepuestos_ClientesJD_terceros]]

```sql
CREATE VIEW [dbo].[vw_VentaRepuestos_ClientesJD] AS
select distinct Año,    Mes,   CodigoCentro,  Centro,  Nitcliente, NombreCliente, 
       ValorRepuestosMostrador=sum(ValorRepuestosMostrador),
       ValorRepuestosTaller=sum(ValorRepuestosTaller),ValorManoObra=sum(ValorManoObra),ValorVar=sum(ValorVar),
       t.tipoPersona,t.celular,t.fijo,t.Direccion,t.Poblacion,t.Email,t.EmailOtro,c.LimiteCredito,descripciontrabajo
  from (select Año=year(FechaFactura),Mes=month(FechaFactura),CodigoCentro,centro,Nitcliente,NombreCliente,
               ValorRepuestosMostrador=sum(ValorNeto), ValorRepuestosTaller=0,ValorManoObra=0,ValorVar=0,descripciontrabajo=''
          from ComisionesSpigaAlmacenAlbaran
         where centro like 'JD%'
         group by year(FechaFactura),month(FechaFactura),CodigoCentro,centro,Nitcliente,NombreCliente
         union all
        select distinct Año=year(FechaFactura),Mes=month(FechaFactura),CodigoCentro,centro,Nitcliente,NombreCliente,ValorRepuestosMostrador=0,
               ValorRepuestosTaller=case when TipoOperacion = 'MAT' then sum(ValorNeto) else 0 end,
               ValorManoObra=case when TipoOperacion in ('MO','PIN','SUB') then sum(ValorNeto) else 0 end,
               ValorVar= case when TipoOperacion in ('VAR') then sum(ValorNeto) else 0 end,descripciontrabajo
          from ComisionesSpigaTallerPorOT
         where centro like 'JD%'
         group by year(FechaFactura),month(FechaFactura),CodigoCentro,centro,Nitcliente,NombreCliente,TipoOperacion,descripciontrabajo
       )a  
  left join vw_VentaRepuestos_ClientesJD_terceros    t    on a.Nitcliente = t.NifCif
  left join vw_spiga_limite_Credito                  c    on convert(varchar,t.pkterceros) = convert(varchar,c.PkFkTerceros)
                                                         and pkfkempresas = 1
--where año=2023
--and mes= 2
group by Año,Mes,CodigoCentro,Centro,Nitcliente,NombreCliente,t.celular,t.fijo,t.Direccion,
         t.Poblacion,t.Email,t.EmailOtro,c.LimiteCredito,descripciontrabajo,t.tipoPersona



```
