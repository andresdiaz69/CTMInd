# Stored Procedure: sp_TerceroTerceroTipos

## Usa los objetos:
- [[TerceroTerceroTipos]]

```sql






CREATE PROCEDURE [dbo].[sp_TerceroTerceroTipos]
--JCS: 2023/08/24 - AJUSTADO POR TEMAS DE PERFORMANCE Y EN REALIDAD SOLO SE NECESITA PkFkterceros Y PkFktercerotipos
--JCS: 2023/08/24 - AHORA SE VA A GUARDAR LA FOTO EN LA TABLA: spiga_TerceroTerceroTipos
--(
--	@idEmpresas int,  
--	@FechaInicial datetime, 
--	@FechaFinal datetime
--) 

as

--select distinct PkFkempresas,PkFkcentros,PkFkterceros,PkFktercerotipos,UserMod,FechaAlta,FechaMod
select distinct PkFkempresas,PkFkterceros,PkFktercerotipos
from [192.168.90.10\SPIGAPLUS].DMS00280.[CM].[TerceroTerceroTipos] 
where FechaBaja is null
ORDER BY PkFkterceros
--and PkFkempresas	=	@idEmpresas
--and FechaMod		>=	@FechaInicial
--and FechaMod		<=	@FechaFinal


```
