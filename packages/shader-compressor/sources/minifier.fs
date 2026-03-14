module Minifier

open System.IO
open System.Runtime.InteropServices
open FSharp.NativeInterop
open ShaderMinifier
open Options

#nowarn "9"

module internal Cast =
    let inline toNativeInt (value: voidptr): nativeint =
        value |> NativePtr.ofVoidPtr<byte> |> NativePtr.toNativeInt

    let inline toVoidPtr (value: nativeint): voidptr =
        value |> NativePtr.ofNativeInt |> NativePtr.toVoidPtr<byte>

[<UnmanagedCallersOnly(EntryPoint = "minifier_minify")>]
let minify (pointer: voidptr): voidptr =
    let shaderSource = Cast.toNativeInt pointer |> Marshal.PtrToStringUTF8

    let options: Options = {
        version = false
        outputName = "shader_code.h"
        outputFormat = Text
        verbose = false
        debug = false
        canonicalFieldNames = "xyzw"
        preserveExternals = true
        preserveAllGlobals = false
        hlsl = false
        noInlining = false
        noOverloading = false
        aggroInlining = false
        noSequence = false
        noRenaming = false
        noRenamingList = [ "main"; "mainImage" ]
        noRemoveUnused = false
        moveDeclarations = false
        preprocess = false
        exportKkpSymbolMaps = false
    }

    let minifier = Minifier(options, [| "source.glsl", shaderSource |])

    new StringWriter()
        |> fun writer -> minifier.Format writer; writer.ToString()
        |> Marshal.StringToCoTaskMemUTF8
        |> Cast.toVoidPtr

[<UnmanagedCallersOnly(EntryPoint = "minifier_release")>]
let release (pointer: voidptr): unit =
    Cast.toNativeInt pointer |> Marshal.FreeCoTaskMem
