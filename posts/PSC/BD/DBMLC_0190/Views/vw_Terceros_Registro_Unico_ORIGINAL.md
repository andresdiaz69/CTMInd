# View: vw_Terceros_Registro_Unico_ORIGINAL

## Usa los objetos:
- [[spiga_Terceros]]

```sql







CREATE view [dbo].[vw_Terceros_Registro_Unico] as
--JCS: 2023/08/25 -- REVERSADO A SU ESTADO ORIGINAL, SE AJUSTO LA SINCRONIZACIÓN DE LOS TIPOS
--MS: 2023/08/30 -- se agrega filtro and tt.PkFktercerotipos <>'CPOT' excluyendo clientes potenciales y se dejan los dos filtros al final
--select PkTerceros,                fkterceroclases,        fktratamientos,         Nifcif,               
--       nombre,                    Apellido1,              Apellido2,              nombrecomercial,
--       EmpresaTrabajo,            FkProfesiones,          FkTerceroCargos,        FkTerceroFormacionNiveles,
--       FechaNacimiento,           NumeroHijos,            Fecha_Alta,             FechaBaja,
--       a.UserMod,                 FkDocumentacionTipos,   FkEstadoCivilTipos,     a.FechaMod,
--       Sexo,                      FkActividadTipos,       Robinson  ,             FkNaturalezaJuridicaTipos,   
--       TipoContribuyente,         RobinsonAnt,            FechaModRobinson,       FkCausaBajaTercero,
--       NoTieneEmail,              CentroCoste,            FkNivelesRiesgo,        NifCif_FechaExpedicion,
--       NifCif_LugarExpedicion,    PkFktercerotipos 
--  from (select orden = ROW_NUMBER() over(partition by nifcif order by t.FechaAlta desc),
--               t.PkTerceros,               fkterceroclases,        fktratamientos,          Nifcif,               
--               t.nombre,                   Apellido1,              Apellido2,               nombrecomercial,
--                  EmpresaTrabajo,          FkProfesiones,          FkTerceroCargos,         FkTerceroFormacionNiveles,
--                  FechaNacimiento,         NumeroHijos,            t.FechaAlta fecha_alta,  t.FechaBaja,
--                  t.UserMod,               FkDocumentacionTipos,   FkEstadoCivilTipos,      t.FechaMod,
--                  Sexo,                    FkActividadTipos,       Robinson  ,              FkNaturalezaJuridicaTipos,   
--                  TipoContribuyente,       RobinsonAnt,            FechaModRobinson,        FkCausaBajaTercero,
--                  NoTieneEmail,            CentroCoste,            FkNivelesRiesgo,         NifCif_FechaExpedicion,
--                  NifCif_LugarExpedicion,  PkFktercerotipos 
--         from [PSCService_DB].dbo.spiga_Terceros (NOLOCK)        t    
--         left join [PSCService_DB].[dbo].spiga_TerceroTerceroTipos tt on tt.PkFkterceros = t.PkTerceros   
--		                                                     --and tt.PkFktercerotipos <>'CON'
--        where FechaBaja is null
--		  and tt.PkFktercerotipos <>'CON' 
--		  and tt.PkFktercerotipos <>'CPOT' --653.549 +142.617
--       )a  --852.805
--where orden=1
--JCS: 2023/09/04 -- BACKUP POR SI SE DEBE REVERSAR POR TEMAS DE PERFORMANCE
--JCS: 2023/10/06 -- SE CAMBIA NUEVAMENTE POR TEMAS DE PERFORMANCEDE PERFORMANCE
select PkTerceros,                fkterceroclases,        fktratamientos,         Nifcif,               
       nombre,                    Apellido1,              Apellido2,              nombrecomercial,
       EmpresaTrabajo,            FkProfesiones,          FkTerceroCargos,        FkTerceroFormacionNiveles,
       FechaNacimiento,           NumeroHijos,            FechaAlta AS Fecha_Alta,             FechaBaja,
       UserMod,                   FkDocumentacionTipos,   FkEstadoCivilTipos,     FechaMod,
       Sexo,                      FkActividadTipos,       Robinson  ,             FkNaturalezaJuridicaTipos,   
       TipoContribuyente,         RobinsonAnt,            FechaModRobinson,       FkCausaBajaTercero,
       NoTieneEmail,              CentroCoste,            FkNivelesRiesgo,        NifCif_FechaExpedicion,
       NifCif_LugarExpedicion 
       from [PSCService_DB].dbo.spiga_Terceros 
	   where  FechaBaja is null

```
