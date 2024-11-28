# View: v_ClubIntegral_vin_vendedor

## Usa los objetos:
- [[ComisionesSpigaVN]]
- [[ComisionesSpigaVO]]

```sql


CREATE view [dbo].[v_ClubIntegral_vin_vendedor] as
select distinct Vin,CedulaVendedor,NombreVendedor
from ComisionesSpigaVN

union all
select distinct Vin,CedulaVendedor,NombreVendedor
from ComisionesSpigaVO


```
