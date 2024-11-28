# View: v_ClubIntegral_Ticket_asesores_colision

## Usa los objetos:
- [[ComisionesSpigaTallerPorOT]]
- [[v_ClubIntegral_AsesoresColision]]
- [[v_ClubIntegral_Entradas_OT]]

```sql
create view [dbo].[v_ClubIntegral_Ticket_asesores_colision] as

select  distinct c.Ano_Spiga,c.Mes_Spiga,c.CodigoEmpresa,empresa,v.codigomarca,v.marca,v.IdCLubIntegralModeloSub,v.NombreModeloSub,

v.codigoempleado,v.nombres,ValorNeto= sum(ValorNeto),o.entradas,Ticket = ((sum(ValorNeto)/o.entradas))/1000

from         v_ClubIntegral_AsesoresColision          v     

left join    ComisionesSpigaTallerPorOT               c      on     c.CedulaAsesorServicioResponsable = v.codigoempleado

left join    v_ClubIntegral_Entradas_OT               o      on     c.Ano_Spiga = o.ano_spiga and c.Mes_Spiga = o.mes_spiga

                                                                                              and v.codigoempleado = o.CedulaAsesorServicioResponsable

where v.codigomarca is not null

and c.Ano_Spiga >= 2018

--and c.Mes_Spiga = 8

group by c.Ano_Spiga,c.Mes_Spiga,CodigoEmpresa,empresa,v.codigomarca,v.marca,v.codigoempleado,v.nombres,o.entradas,v.IdCLubIntegralModeloSub,v.NombreModeloSub






```
