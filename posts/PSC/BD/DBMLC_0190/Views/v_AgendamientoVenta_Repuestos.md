# View: v_AgendamientoVenta_Repuestos

## Usa los objetos:
- [[ComisionesSpigaAlmacenAlbaran]]

```sql
create view v_AgendamientoVenta_Repuestos as
select nitcliente,Marca,referencia,DescripcionReferencia,Cantidad= sum(UnidadesVendidas), Valor= sum(ValorNeto)
from ComisionesSpigaAlmacenAlbaran
where tipomov not in ('VIN','VINA')
--AND Nitcliente = '176103487'
group by  nitcliente,Marca,referencia,DescripcionReferencia
having  sum(UnidadesVendidas) <> 0 

```
