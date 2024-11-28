# View: v_ClubIntegral_Entradas_OT

## Usa los objetos:
- [[ComisionesSpigaTallerPorOT]]

```sql
create view [dbo].[v_ClubIntegral_Entradas_OT] as

select Ano_Spiga,Mes_Spiga,CedulaAsesorServicioResponsable,Entradas=count(OT)

from(

       select distinct ano_spiga,mes_spiga,CedulaAsesorServicioResponsable,OT=substring(numot,6,posicion)

       from(

                    select distinct Ano_Spiga,Mes_Spiga,CedulaAsesorServicioResponsable,NumOT,Posicion = posicion-6

                    from (

                                  select distinct Ano_Spiga,Mes_Spiga,CedulaAsesorServicioResponsable,NUmOT,posicion= CHARINDEX('\',NumOT,10)

                                  from   ComisionesSpigaTallerPorOT

                                  where Ano_Spiga >= 2018

                                  --and Mes_Spiga = 8

                                  --and CedulaAsesorServicioResponsable= '1015418486'

                    ) a --group by Ano_Spiga,Mes_Spiga,CedulaAsesorServicioResponsable

       )b            --group by ano_spiga,mes_spiga,CedulaAsesorServicioResponsable,numot,posicion

)c group by Ano_Spiga,Mes_Spiga,CedulaAsesorServicioResponsable

 

 








```
