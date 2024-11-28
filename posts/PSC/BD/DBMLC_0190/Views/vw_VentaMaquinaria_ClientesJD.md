# View: vw_VentaMaquinaria_ClientesJD

## Usa los objetos:
- [[ComisionesSpigaVN]]
- [[vw_spiga_limite_Credito]]
- [[vw_VentaRepuestos_ClientesJD_terceros]]

```sql
CREATE VIEW [dbo].[vw_VentaMaquinaria_ClientesJD] AS
select distinct FechaEntregaCliente,	CodigoCentro,  Centro,	Nitcliente,	NombreCliente,	t.tipoPersona,	t.celular,	t.fijo,
t.Direccion,	t.Poblacion,	t.Email,	t.EmailOtro,	c.LimiteCredito,	a.vin,	codigomarca,	codigogama,	gama,                      
codigomodelo,	añomodelo,	modelo,	codigoversion,	nombreversion,	PrecioMaquinaria=sum(PrecioMaquinaria),	TotalFactura =sum(TotalFactura)
from (
		select FechaEntregaCliente,	CodigoCentro,	centro,	Nit Nitcliente,	NombreTercero NombreCliente,	vin,	codigomarca,	codigogama,	gama,	
		codigomodelo,	añomodelo,	modelo,	codigoversion,	nombreversion,	PrecioMaquinaria= sum(PrecioLista-valordto),	TotalFactura
        from ComisionesSpigaVN
        where centro like 'JD%'
        group by FechaEntregaCliente,	CodigoCentro,	centro,	Nit,	NombreTercero,	vin,	codigomarca,	codigogama,	gama,	codigomodelo,
		añomodelo,	modelo,	codigoversion,	nombreversion,	TotalFactura            
)a  
  left join vw_VentaRepuestos_ClientesJD_terceros    t    on a.Nitcliente = t.NifCif
  left join vw_spiga_limite_Credito                  c    on convert(varchar,t.pkterceros) = convert(varchar,c.PkFkTerceros)
                                                         and pkfkempresas = 1
--where year(FechaEntregaCliente) in (2016,2017,2018,2019,2020,2021,2022,2023)
--and Nitcliente = '8600030201'
group by FechaEntregaCliente,	CodigoCentro,	Centro,	Nitcliente,	NombreCliente,	t.celular,	t.fijo,	t.Direccion,	t.Poblacion,  
t.Email,	t.EmailOtro,	c.LimiteCredito,	t.tipoPersona,	a.vin,	codigomarca,	codigogama,	gama,	codigomodelo,	nombreversion ,    
añomodelo,	modelo,	codigoversion 

```
