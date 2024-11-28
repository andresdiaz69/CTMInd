# View: vw_Terceros_Registro_Unico

## Usa los objetos:
- [[spiga_Terceros]]
- [[spiga_TerceroTerceroTipos]]

```sql


CREATE view [dbo].[vw_Terceros_Registro_Unico] as
--JCS: 2023/08/25 -- REVERSADO A SU ESTADO ORIGINAL, SE AJUSTO LA SINCRONIZACIÓN DE LOS TIPOS
----MS: 2023/08/30 -- se agrega filtro and tt.PkFktercerotipos <>'CPOT' excluyendo clientes potenciales y se dejan los dos filtros al final
----MS: 2024/05/22 -- se agrega filtro para quitar los contactos antes de validar los duplicados por Nifcif
----DC: 2024/05/24 -- Se agrega la llave para mapearla en el entity

select distinct 
       --orden = ROW_NUMBER() over(partition by t.nifcif order by t.FechaAlta desc),
	   Id = ISNULL(ROW_NUMBER() OVER(ORDER BY (t.PKTerceros)), 0),
       t.PkTerceros,            fkterceroclases,        fktratamientos,          t.Nifcif,               
       t.nombre,                Apellido1,              Apellido2,               nombrecomercial,
       EmpresaTrabajo,          FkProfesiones,          FkTerceroCargos,         FkTerceroFormacionNiveles,
       FechaNacimiento,         NumeroHijos,            t.FechaAlta fecha_alta,  t.FechaBaja,
       t.UserMod,               FkDocumentacionTipos,   FkEstadoCivilTipos,      t.FechaMod,
       Sexo,                    FkActividadTipos,       Robinson  ,              FkNaturalezaJuridicaTipos,   
       TipoContribuyente,       RobinsonAnt,            FechaModRobinson,        FkCausaBajaTercero,
       NoTieneEmail,            CentroCoste,            FkNivelesRiesgo,         NifCif_FechaExpedicion,
       NifCif_LugarExpedicion--,  PkFktercerotipos 
  from (select distinct ltrim(rtrim(NifCif)) NifCif, max(FechaAlta)FechaAlta
		  from [PSCService_DB].dbo.spiga_Terceros a 
		  left join(select distinct PkFkterceros,PkFktercerotipos 
		              from [PSCService_DB].[dbo].spiga_TerceroTerceroTipos)  tt on tt.PkFkterceros = a.PkTerceros  
			         where tt.PkFktercerotipos <>'CON' 
		               and tt.PkFktercerotipos <>'CPOT'
				   --  and NifCif='946'
				     group by NifCif ) t1
		  join [PSCService_DB].dbo.spiga_Terceros (NOLOCK) t on t1.NifCif    = t.NifCif
		                                                    and t1.FechaAlta = t.FechaAlta     
          left join(select distinct PkFkterceros,PkFktercerotipos 
		              from [PSCService_DB].[dbo].spiga_TerceroTerceroTipos) tt on tt.PkFkterceros = t.PkTerceros   
		                                                                    --and tt.PkFktercerotipos <>'CON'
 where FechaBaja is null
   and t.nifcif is not null
   and tt.PkFktercerotipos <>'CON' 
   and tt.PkFktercerotipos <>'CPOT'--653.549 +142.617

		 -- where  nifcif  = '946'	
--JCS: 2023/09/04 -- BACKUP POR SI SE DEBE REVERSAR POR TEMAS DE PERFORMANCE
--JCS: 2023/10/06 -- SE CAMBIA NUEVAMENTE POR TEMAS DE PERFORMANCEDE PERFORMANCE
--select PkTerceros,                fkterceroclases,        fktratamientos,         Nifcif,               
--       nombre,                    Apellido1,              Apellido2,              nombrecomercial,
--       EmpresaTrabajo,            FkProfesiones,          FkTerceroCargos,        FkTerceroFormacionNiveles,
--       FechaNacimiento,           NumeroHijos,            FechaAlta AS Fecha_Alta,             FechaBaja,
--       UserMod,                   FkDocumentacionTipos,   FkEstadoCivilTipos,     FechaMod,
--       Sexo,                      FkActividadTipos,       Robinson  ,             FkNaturalezaJuridicaTipos,   
--       TipoContribuyente,         RobinsonAnt,            FechaModRobinson,       FkCausaBajaTercero,
--       NoTieneEmail,              CentroCoste,            FkNivelesRiesgo,        NifCif_FechaExpedicion,
--       NifCif_LugarExpedicion 
--       from [PSCService_DB].dbo.spiga_Terceros 
--	   where  FechaBaja is null
 
 


```
