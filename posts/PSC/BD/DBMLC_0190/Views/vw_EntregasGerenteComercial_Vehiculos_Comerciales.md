# View: vw_EntregasGerenteComercial_Vehiculos_Comerciales

## Usa los objetos:
- [[ComisionesSpigaVN]]

```sql
create view vw_EntregasGerenteComercial_Vehiculos_Comerciales as
select v.Ano_Periodo,v.Mes_Periodo,v.Ano_Spiga,v.Mes_Spiga,v.Codigoempresa,v.Empresa,v.FechaFactura,v.NumeroFactura,v.VIN,
v.CodigoMArca,v.Marca,v.CodigoGama,v.gama,v.CodigoModelo,v.AñoModelo,v.Modelo,v.FechaEntregaCliente,v.EntregaEfectiva
from ComisionesSpigaVN		v
where Codigomarca = 317
and CodigoModelo in ('36800611CO1','36800651CO1','36810411CO1','38422311CO1','38422351CO1','63401111CO1','63401111CO1-ABA','63401151CO1','83100211CO1',
'83100211CO1','97001352CO1','97004752CO1','97927651CO1','97927751CO1','97927751CO1-45','9BM368006','9BM381898','9BM384223','OF917',
'WDB970013EXCKDBUS','WDB970047','WDB970047EXCKDBUS')

union all

select v.Ano_Periodo,v.Mes_Periodo,v.Ano_Spiga,v.Mes_Spiga,v.Codigoempresa,v.Empresa,v.FechaFactura,v.NumeroFactura,v.VIN,
v.CodigoMArca,v.Marca,v.CodigoGama,v.gama,v.CodigoModelo,v.AñoModelo,v.Modelo,v.FechaEntregaCliente,v.EntregaEfectiva
from ComisionesSpigaVN		v
where CodigoMArca =329

union all

select v.Ano_Periodo,v.Mes_Periodo,v.Ano_Spiga,v.Mes_Spiga,v.Codigoempresa,v.Empresa,v.FechaFactura,v.NumeroFactura,v.VIN,
v.CodigoMArca,v.Marca,v.CodigoGama,v.gama,v.CodigoModelo,v.AñoModelo,v.Modelo,v.FechaEntregaCliente,v.EntregaEfectiva
from ComisionesSpigaVN		v
where CodigoMArca = 263
and CodigoModelo in ('FE85DE6SLNQACO1-BUS','FE85DE6SLNQACO1-BUS','FE85DE6SLNQACO1-BUS')

```
