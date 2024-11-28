# View: Vw_Agendamientocitas_ConOt_SinOt

## Usa los objetos:
- [[vW_agendamientocitas_ConOT]]
- [[vW_agendamientocitas_SinOT]]

```sql
create view Vw_Agendamientocitas_ConOt_SinOt as
select IdEmpresas,               IdCentros,       IdCitas,        Matricula,       FechaCita, 
       FechaAltaCita,            AñoOT,           SerieOT,        NumOT,           DescripcionTrabajos,
       IdCargoTipos,             IdTerceros,      NombreTercero,  IdCitaTipos,     NombreEmpleadoAltaOT,
	   NombreEmpleado,           VIN,             Movil,          Observaciones,   PersonaContacto, 
	   TelefonoPersonaContacto,  NifCifEmpleado,  OrigenCitas,    NombreCentro,    NombreUnidadNegocio,
	   documento,                telefono,        email,          medio,           Motivo_de_no_asistencia,
	   base,                     nombreMarca,     nombreGama,     duplicados
  from (select orden = ROW_NUMBER() over(partition by duplicados order by base ),
               IdEmpresas,               IdCentros,       IdCitas,        Matricula,       FechaCita, 
               FechaAltaCita,            AñoOT,           SerieOT,        NumOT,           DescripcionTrabajos,
               IdCargoTipos,             IdTerceros,      NombreTercero,  IdCitaTipos,     NombreEmpleadoAltaOT,
	           NombreEmpleado,           VIN,             Movil,          Observaciones,   PersonaContacto, 
	           TelefonoPersonaContacto,  NifCifEmpleado,  OrigenCitas,    NombreCentro,    NombreUnidadNegocio,
	           documento,                telefono,        email,          medio,           Motivo_de_no_asistencia,
	           base,                     nombreMarca,     nombreGama,     duplicados
          from (select IdEmpresas,               IdCentros,       IdCitas,        Matricula,       FechaCita, 
                       FechaAltaCita,            AñoOT,           SerieOT,        NumOT,           DescripcionTrabajos,
                       IdCargoTipos,             IdTerceros,      NombreTercero,  IdCitaTipos,     NombreEmpleadoAltaOT,
	                   NombreEmpleado,           VIN,             Movil,          Observaciones,   PersonaContacto, 
	                   TelefonoPersonaContacto,  NifCifEmpleado,  OrigenCitas,    NombreCentro,    NombreUnidadNegocio,
	                   documento,                telefono,        email,          medio,           Motivo_de_no_asistencia,
	                   base,                     nombreMarca,     nombreGama,     duplicados
                  from [DBMLC_0190].dbo.vW_agendamientocitas_ConOT 
   
                 union all

                select IdEmpresas,               IdCentros,       IdCitas,        Matricula,       FechaCita, 
                       FechaAltaCita,            AñoOT,           SerieOT,        NumOT,           DescripcionTrabajos,
                       IdCargoTipos,             IdTerceros,      NombreTercero,  IdCitaTipos,     NombreEmpleadoAltaOT,
	                   NombreEmpleado,           VIN,             Movil,          Observaciones,   PersonaContacto, 
	                   TelefonoPersonaContacto,  NifCifEmpleado,  OrigenCitas,    NombreCentro,    NombreUnidadNegocio,
	                   documento,                telefono,        email,          medio,           Motivo_de_no_asistencia,
	                   base,                     nombreMarca,     nombreGama,     duplicados
                  from [DBMLC_0190].dbo.vW_agendamientocitas_sinOT 
		-- 
		       ) a
	  )b
where orden = 1
  --and duplicados = '2020-10-28GKX2571'


 


  --1.no se quitan las secciones de boutique ya que la tabla spiga_OrdenesDeTrabajoCitasConOT no cuenta con este campo para identificarlas
  
 -- select * from [PSCService_DB].dbo.spiga_OrdenesDeTrabajoCitasConOT ot

 -- select distinct * from UnidadDeNegocio where codcentro= 149

```
